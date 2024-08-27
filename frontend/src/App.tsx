import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@nextui-org/react';
import { EditIcon } from './EditIcon';
import { DeleteIcon } from './DeleteIcon';
import { EyeIcon } from './EyeIcon';
import { columns, IUser } from './data';
import axios from 'axios';
import { faker } from '@faker-js/faker';

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const isMounted = useRef(false);
  const renderCell = useCallback((user: IUser, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const handleCreate = useCallback(async () => {
    const payload: IUser = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      age: faker.number.int({
        min: 0, max: 100,
      }),
      role: faker.string.alpha(),
      avatar: faker.image.avatar(),
      status: faker.internet.mac(),
      team: faker.internet.color(),
      name: faker.person.fullName(),
    };
    await axios.post('http://localhost:8080/api/users', payload);
  }, []);
  const handleFetchUsers = useCallback(async () => {
    const response = await axios.get('http://localhost:8080/api/users');
    if (response.data) {
      setUsers(response.data);
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    handleFetchUsers().then(r => r);
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const evtSource = new EventSource('http://localhost:8080/api/users/sse');
    evtSource.addEventListener('interval', (event) => {
      console.log('CHECK event:', event);
    });


  }, []);

  return (
    <>
      <Button color="success" onClick={handleCreate}>
        Generate user
      </Button>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default App;