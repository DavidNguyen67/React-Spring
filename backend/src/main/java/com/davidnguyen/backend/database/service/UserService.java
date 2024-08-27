package com.davidnguyen.backend.database.service;

import com.davidnguyen.backend.database.entity.UserEntity;
import com.davidnguyen.backend.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserEntity> getAllUsers() {
        return this.userRepository.findAll();
    }

    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        this.userRepository.deleteById(id);
    }

}
