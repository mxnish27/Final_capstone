package com.sutherland.lms.exceptions;

@SuppressWarnings("serial")
public class EmailVerificationException extends RuntimeException {

	public EmailVerificationException(String str) {
		super(str);
	}

}
