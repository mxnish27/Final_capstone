package com.sutherland.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sutherland.lms.dto.LeaveRequestDto;
import com.sutherland.lms.entity.LeaveRequest;
import com.sutherland.lms.enums.LeaveStatus;
import com.sutherland.lms.service.LeaveRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/leave")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveService;

    @PostMapping("/applyleave")
    public ResponseEntity<String> applyForLeave(@RequestBody LeaveRequestDto leaveRequest) {
        leaveService.applyForLeave(leaveRequest);
        return new ResponseEntity<>("Leave applied successfully", HttpStatus.OK);
    }

    @PutMapping("/verifyleave/{id}")
    public ResponseEntity<LeaveRequest> verifyLeave(
            @PathVariable int id,
            @RequestParam LeaveStatus status,
            @RequestParam(required = false) String remarks) {
        LeaveRequest leave = leaveService.verifyLeave(id, status, remarks);
        return new ResponseEntity<>(leave, HttpStatus.OK);
    }

    @PutMapping("/cancelleave/{id}")
    public ResponseEntity<LeaveRequest> cancelLeave(@PathVariable int id) {
        LeaveRequest leave = leaveService.cancelLeave(id);
        return new ResponseEntity<>(leave, HttpStatus.OK);
    }

    @PutMapping("/withdrawleave/{id}")
    public ResponseEntity<LeaveRequest> withdrawLeave(@PathVariable int id) {
        LeaveRequest leave = leaveService.withDrawLeave(id);
        return new ResponseEntity<>(leave, HttpStatus.OK);
    }

    @GetMapping("/history/{empId}")
    public ResponseEntity<List<LeaveRequest>> getLeaveHistory(@PathVariable String empId) {
        List<LeaveRequest> history = leaveService.getLeaveHistory(empId);
        return new ResponseEntity<>(history, HttpStatus.OK);
    }
    
    @GetMapping("/leaveappliedbymanager/{managerId}")
    public ResponseEntity<List<LeaveRequest>> getLeavesAppliedByManager(@PathVariable String managerId) {
        
        List<LeaveRequest> leaves = leaveService.getLeavesAppliedByEmployees(managerId);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }


    @GetMapping("/leavestatus/{id}")
    public ResponseEntity<LeaveStatus> checkStatus(@PathVariable int id) {
        LeaveStatus status = leaveService.checkStatus(id);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
}