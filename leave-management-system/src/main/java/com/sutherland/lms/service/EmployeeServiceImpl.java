package com.sutherland.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sutherland.lms.entity.Employee;
import com.sutherland.lms.exceptions.EmailVerificationException;
import com.sutherland.lms.exceptions.EmployeeIdWrongException;
import com.sutherland.lms.exceptions.EmployeeNotFoundException;
import com.sutherland.lms.repo.EmployeeRepo;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo repo;

    @Override
    public ResponseEntity<Employee> getEmployeeById(String empId) {
        Optional<Employee> emp = repo.findById(empId);
        if (emp.isEmpty()) throw new EmployeeNotFoundException("Employee with this ID does not exist...");
        return new ResponseEntity<>(emp.get(), HttpStatus.OK);
    }

    @Override
    public Employee addEmployee(Employee employee) {
        
        if (employee.getEmpId() == null || !employee.getEmpId().startsWith("SUTH") || employee.getEmpId().length() > 9) {
            throw new EmployeeIdWrongException("Employee ID must start with SUTH and be max 9 characters");
        }

        if (employee.getEmail() == null || !employee.getEmail().toLowerCase().endsWith("@sutherlandglobal.com")) {
            throw new EmailVerificationException("Only company emails (@sutherlandglobal.com) are allowed");
        }

        if ("MANAGER".equalsIgnoreCase(employee.getJob())) {
            employee.setManagerId(null);
        } else {
            if (employee.getManagerId() == null) {
                throw new EmployeeNotFoundException("Employee must have a manager unless they are Manager role");
            }
            repo.findById(employee.getManagerId())
                .orElseThrow(() -> new EmployeeNotFoundException("Manager not found..."));
        }

        return repo.save(employee);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return repo.findAll();
    }

    @Override
    public List<Employee> getEmployeeByManager(String managerId) {
        return repo.findByManagerId(managerId);
    }
}
