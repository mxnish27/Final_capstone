package com.sutherland.lms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(value = EmployeeNotFoundException.class)
	public ResponseEntity<String> employeeNotFoundException(EmployeeNotFoundException ex){
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.OK);
	
	}
	
	@ExceptionHandler(value = LeaveNotFoundException.class)
	public ResponseEntity<String> leaveNotFoundException(LeaveNotFoundException ex) {
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.OK);
	}
	
	@ExceptionHandler(value = LeaveStatusNotMatch.class)
	public ResponseEntity<String> leaveStatusNotMatchException(LeaveStatusNotMatch ex){
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.OK);
	}
	
	@ExceptionHandler(value = EmployeeIdWrongException.class)
	public ResponseEntity<String> employeeIdWrongException(EmployeeIdWrongException ex) {
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.OK);
	}
	
	@ExceptionHandler(value = EmailVerificationException.class)
	public ResponseEntity<String> emailVerificationException(EmailVerificationException ex) {
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.OK);
	}
}