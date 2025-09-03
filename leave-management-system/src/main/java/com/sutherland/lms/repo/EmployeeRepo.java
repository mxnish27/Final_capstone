package com.sutherland.lms.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sutherland.lms.entity.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, String> {
	
    List<Employee> findByManagerId(String managerId);
}
