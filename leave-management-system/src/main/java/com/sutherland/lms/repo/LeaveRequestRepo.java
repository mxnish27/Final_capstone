package com.sutherland.lms.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sutherland.lms.entity.LeaveRequest;
import com.sutherland.lms.enums.LeaveStatus;

@Repository
public interface LeaveRequestRepo extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployee_EmpId(String empId);
    List<LeaveRequest> findByManagerId(String managerId);
	List<LeaveRequest> findByEmployee_ManagerIdAndLeaveStatus(String managerId, LeaveStatus applied);
}
