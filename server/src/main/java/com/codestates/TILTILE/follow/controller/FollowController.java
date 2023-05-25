//package com.codestates.TILTILE.follow.controller;
//
//import com.codestates.TILTILE.follow.request.CreateFollowRequest;
//import com.codestates.TILTILE.follow.service.FollowService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//@Controller
//@RestController
//@RequestMapping("/follow")
//public class FollowController {
//
//    @Autowired
//    private FollowService followService;
//
//    @PostMapping("/create")
//    public ResponseEntity<String> createFollow(@RequestBody CreateFollowRequest request) {
//        followService.createFollow(request.getFollowerId(), request.getFollowingId());
//        return ResponseEntity.ok("Follow created successfully");
//    }
//
//    @PostMapping("/delete")
//    public ResponseEntity<String> deleteFollow(@RequestParam("followerId") Long followerId, @RequestParam("followedMemberId") Long followedMemberId) {
//        followService.deleteFollow(followerId, followerId, followedMemberId);
//        return ResponseEntity.ok("Follow deleted successfully");
//    }
//
//}
//
//// member_id -> follower (RequestParam)
//// 팔로우 버튼 클릭시 받는 member_id -> followed_member_id
//// 팔로우 주체 -> RequestParam
//// 팔로우 피사체 -> 주소로
