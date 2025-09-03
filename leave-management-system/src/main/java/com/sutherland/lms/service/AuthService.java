package com.sutherland.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sutherland.lms.entity.Employee;
import com.sutherland.lms.repo.EmployeeRepo;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepo employeeRepository;

    public Employee login(String empId, String password) {
        Employee emp = employeeRepository.findById(empId).orElse(null);
        if (emp == null) {
            throw new RuntimeException("Employee not found");
        }
        if (!emp.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return emp;
    }
}
