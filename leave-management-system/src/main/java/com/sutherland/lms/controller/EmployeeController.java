package com.sutherland.lms.controller;

import com.sutherland.lms.entity.Employee;
import com.sutherland.lms.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    
    @PostMapping("/addemployee")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee saved = service.addEmployee(employee);
        return ResponseEntity.ok(saved);
    }

   
    @GetMapping("/getdetails/{empId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String empId) {
        return service.getEmployeeById(empId);
    }

    
    @GetMapping("/all")
    public List<Employee> getAllEmployees() {
        return service.getAllEmployee();
    }

    
    @GetMapping("/manager/{managerId}")
    public List<Employee> getEmployeeByManager(@PathVariable String managerId) {
        return service.getEmployeeByManager(managerId);
    }
}
