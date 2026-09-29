package com.salary.management.controller;

import com.salary.management.entity.User;
import com.salary.management.repository.UserRepository;
import com.salary.management.dto.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.salary.management.dto.LoginResponse;
import com.salary.management.security.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        if (userRepository.existsByUsername(
                user.getUsername())) {

            return ResponseEntity
                    .badRequest()
                    .body("Username already exists.");
        }

        if (userRepository.existsByEmail(
                user.getEmail())) {

            return ResponseEntity
                    .badRequest()
                    .body("Email already exists.");
        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        // Don't let public registration choose ADMIN.
        user.setRole("USER");

        userRepository.save(user);

        return ResponseEntity.ok(
                "User registered successfully."
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest loginRequest) {

        User user = userRepository
                .findByUsername(
                        loginRequest.getUsername()
                )
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .status(401)
                    .body(
                            "Invalid username or password."
                    );
        }

        boolean passwordMatches =
                passwordEncoder.matches(
                        loginRequest.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {

            return ResponseEntity
                    .status(401)
                    .body(
                            "Invalid username or password."
                    );
        }

        String token =
                jwtService.generateToken(
                        user.getUsername(),
                        user.getRole()
                );

        LoginResponse response =
                new LoginResponse(
                        token,
                        user.getUsername(),
                        user.getRole()
                );

        return ResponseEntity.ok(response);
    }
}