package com.example.Task.Manageer.security;

import com.example.Task.Manageer.model.User;
import com.example.Task.Manageer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("USER"); // default role
        userRepo.save(user);
        return ResponseEntity.ok("User registered");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        System.out.println("Attempting login for user: " + user.getUsername());

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            // Generate token using username
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());


            return ResponseEntity.ok(Collections.singletonMap("token", token));
        } catch (BadCredentialsException ex) {
            System.out.println("Bad credentials for user: " + user.getUsername());
            return ResponseEntity.status(401)
                    .body(Collections.singletonMap("error", "Invalid username or password"));
        }
    }
}
