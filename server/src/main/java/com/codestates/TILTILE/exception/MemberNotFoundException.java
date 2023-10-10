package com.codestates.TILTILE.exception;

public class MemberNotFoundException extends RuntimeException {
    private final int status;

    public MemberNotFoundException(int status, String message) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}