package com.davidnguyen.backend.database.repository;

import com.davidnguyen.backend.database.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {
}
