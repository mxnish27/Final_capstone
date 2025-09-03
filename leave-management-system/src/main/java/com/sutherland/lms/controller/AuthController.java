package com.sutherland.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sutherland.lms.dto.LoginRequest;
import com.sutherland.lms.entity.Employee;
import com.sutherland.lms.service.AuthService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Employee> login(@RequestBody LoginRequest request) {
        try {
            Employee emp = authService.login(request.getEmpId(), request.getPassword());
            return ResponseEntity.ok(emp);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(null);
        }
    }
}
