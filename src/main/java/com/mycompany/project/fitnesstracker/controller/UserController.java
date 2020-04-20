package com.mycompany.project.fitnesstracker.controller;

import com.mycompany.project.fitnesstracker.model.User;
import com.mycompany.project.fitnesstracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/signup", consumes = "application/json", produces = "application/json")
    @CrossOrigin(origins = "http://localhost:4200")
    public boolean signup(@RequestBody User user) {

        userRepository.save(user);
        //FIXME: status should be 201
        return true;
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:4200")
    public boolean login(@RequestBody User user) {
        List<User> all = userRepository.findAll();
        //FIXME: status should be 201
        return all.contains(user);
    }

    @GetMapping("/user")
    @CrossOrigin(origins = "http://localhost:4200")
    public Principal user(Principal user) {
        return user;
    }
}
