package com.davidnguyen.backend.database.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table
@Entity(name = "user")
public class UserEntity {
    @Id
    private String id;
    private String name;
    private String role;
    private String team;
    private String status;
    private Number age;
    private String avatar;
    private String email;
}
