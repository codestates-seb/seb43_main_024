package com.codestates.TILTILE.exception;

public class NotFoundException extends RuntimeException {

    private final int status;
    private final String message;

    public NotFoundException(int status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}