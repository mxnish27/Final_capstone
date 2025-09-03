package com.sutherland.lms.dto;

import java.time.LocalDate;

import com.sutherland.lms.enums.LeaveType;

public class LeaveRequestDto {
    private String empId;
    private String managerId;
    private LocalDate fromDate;
    private LocalDate toDate;
    private LeaveType leaveType;

    public String getEmpId() { return empId; }
    public void setEmpId(String empId) { this.empId = empId; }

    public String getManagerId() { return managerId; }
    public void setManagerId(String managerId) { this.managerId = managerId; }

    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }

    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }

    public LeaveType getLeaveType() { return leaveType; }
    public void setLeaveType(LeaveType leaveType) { this.leaveType = leaveType; }
}