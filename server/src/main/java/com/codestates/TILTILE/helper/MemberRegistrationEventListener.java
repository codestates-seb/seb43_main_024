package com.codestates.TILTILE.helper;

import com.codestates.TILTILE.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@Slf4j
@EnableAsync
@Component
public class MemberRegistrationEventListener {
    private final MemberService memberService;

    public MemberRegistrationEventListener(MemberService memberService) {
        this.memberService = memberService;
    }
}