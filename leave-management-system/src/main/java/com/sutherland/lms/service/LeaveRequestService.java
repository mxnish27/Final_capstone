package com.sutherland.lms.service;

import java.util.List;

import com.sutherland.lms.dto.LeaveRequestDto;
import com.sutherland.lms.entity.LeaveRequest;
import com.sutherland.lms.enums.LeaveStatus;

public interface LeaveRequestService {
	void applyForLeave(LeaveRequestDto leave);
	LeaveRequest verifyLeave(int id, LeaveStatus status, String remarks);
	LeaveRequest cancelLeave(int id);
	LeaveRequest withDrawLeave(int id);
	
	List<LeaveRequest> getLeaveHistory(String empId);
	LeaveStatus checkStatus(int id);
	List<LeaveRequest> getLeavesAppliedByEmployees(String managerId);
}