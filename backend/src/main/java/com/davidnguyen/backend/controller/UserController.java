package com.davidnguyen.backend.controller;

import com.davidnguyen.backend.database.entity.UserEntity;
import com.davidnguyen.backend.database.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final SseEmitter emitter = new SseEmitter();

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;


    @GetMapping
    public List<UserEntity> getAllEmployees() {
        return userService.getAllUsers();
    }

    @PostMapping
    public UserEntity createEmployee(@RequestBody UserEntity user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @GetMapping("/sse")
    public SseEmitter streamSse() {
        return emitter;
    }


}
