package com.otr.etax.common;

public class BadCredentialsExceptionWrapper extends RuntimeException {
    public BadCredentialsExceptionWrapper(String message) {
        super(message);
    }
}
