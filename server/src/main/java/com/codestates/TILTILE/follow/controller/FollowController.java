package com.codestates.TILTILE.follow.controller;

import com.codestates.TILTILE.follow.request.CreateFollowRequest;
import com.codestates.TILTILE.follow.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RestController
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("/create")
    public ResponseEntity<String> createFollow(@RequestBody CreateFollowRequest request) {
        followService.createFollow(request.getFollowerId(), request.getFollowingId());
        return ResponseEntity.ok("Follow created successfully");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteFollow(@RequestParam("followerId") Long followerId, @RequestParam("followingId") Long followingId) {
        followService.deleteFollow(followerId, followingId);
        return ResponseEntity.ok("Follow deleted successfully");
    }


}
