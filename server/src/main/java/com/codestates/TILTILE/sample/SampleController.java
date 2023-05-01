package com.codestates.TILTILE.sample;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sample")
public class SampleController {
    @GetMapping("/")
    public ResponseEntity postSample() {
        return new ResponseEntity<>(new ResponseDto("Hello World"), HttpStatus.CREATED);
    }
}
