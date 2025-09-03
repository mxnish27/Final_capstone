package com.sutherland.lms.exceptions;

@SuppressWarnings("serial")
public class EmployeeNotFoundException extends RuntimeException {

	public EmployeeNotFoundException(String string) {
		super(string);
	}

}
