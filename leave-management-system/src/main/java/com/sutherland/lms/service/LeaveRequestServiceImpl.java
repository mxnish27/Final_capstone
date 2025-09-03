package com.sutherland.lms.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sutherland.lms.dto.LeaveRequestDto;
import com.sutherland.lms.entity.Employee;
import com.sutherland.lms.entity.LeaveRequest;
import com.sutherland.lms.enums.LeaveStatus;
import com.sutherland.lms.exceptions.EmployeeNotFoundException;
import com.sutherland.lms.exceptions.LeaveNotFoundException;
import com.sutherland.lms.repo.EmployeeRepo;
import com.sutherland.lms.repo.LeaveRequestRepo;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

    @Autowired
    private LeaveRequestRepo leaveRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public void applyForLeave(LeaveRequestDto leaveRequestDto) {
        String empId = leaveRequestDto.getEmpId();

        Employee emp = employeeRepo.findById(empId).orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));

        long numberOfDays = leaveRequestDto.getToDate().toEpochDay() - leaveRequestDto.getFromDate().toEpochDay() + 1;
        
        LeaveRequest leaveRequest = new LeaveRequest();
        
        leaveRequest.setEmployee(emp);
        leaveRequest.setManagerId(emp.getManagerId());
        leaveRequest.setFromDate(leaveRequestDto.getFromDate());
        leaveRequest.setToDate(leaveRequestDto.getToDate());
        leaveRequest.setLeaveType(leaveRequestDto.getLeaveType());
        
        leaveRequest.setNumberOfDays((int) numberOfDays);
        leaveRequest.setDateApplied(LocalDate.now());
        leaveRequest.setLeaveStatus(LeaveStatus.APPLIED);

        leaveRepo.save(leaveRequest);
    }


    @Override
    public LeaveRequest verifyLeave(int id, LeaveStatus status, String remarks) {
        LeaveRequest leave = leaveRepo.findById((long) id)
                .orElseThrow(() -> new LeaveNotFoundException("Leave not found"));

        if (status == LeaveStatus.REJECTED && (remarks == null || remarks.isBlank())) {
            throw new IllegalArgumentException("Remarks are required when rejecting a leave request");
        }

        leave.setLeaveStatus(status);

        if (status == LeaveStatus.REJECTED && remarks != null) {
            leave.setRemarks(remarks);
        }

        return leaveRepo.save(leave);
    }



    @Override
    public LeaveRequest cancelLeave(int id) {
        LeaveRequest leave = leaveRepo.findById((long) id)
                .orElseThrow(() -> new LeaveNotFoundException("Leave not found"));
        leave.setLeaveStatus(LeaveStatus.CANCELLED);
        return leaveRepo.save(leave);
    }

    @Override
    public LeaveRequest withDrawLeave(int id) {
        LeaveRequest leave = leaveRepo.findById((long) id)
                .orElseThrow(() -> new LeaveNotFoundException("Leave not found"));
        
        leave.setLeaveStatus(LeaveStatus.WITHDRAWN);
        return leaveRepo.save(leave);
    }

    @Override
    public List<LeaveRequest> getLeaveHistory(String empId) {
        return leaveRepo.findByEmployee_EmpId(empId);
    }

    @Override
    public LeaveStatus checkStatus(int id) {   
        LeaveRequest leave = leaveRepo.findById((long) id)
                .orElseThrow(() -> new LeaveNotFoundException("Leave not found"));
        return leave.getLeaveStatus();
    }


    @Override
    public List<LeaveRequest> getLeavesAppliedByEmployees(String managerId) {
        return leaveRepo.findByEmployee_ManagerIdAndLeaveStatus(managerId, LeaveStatus.APPLIED);
    }
}