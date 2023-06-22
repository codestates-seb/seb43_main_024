package com.codestates.TILTILE.batch.processor;

import com.codestates.TILTILE.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;

import java.util.HashSet;
import java.util.Set;

@Slf4j
public class MemberProcessor implements ItemProcessor<Member, Member> {

    private final Set<Long> processedMemberIds = new HashSet<>();

    @Override
    public Member process(Member member) throws Exception {
        if (!processedMemberIds.contains(member.getMemberId())) {
            member.setTilTier(member.getTilTier() + 1);
            processedMemberIds.add(member.getMemberId());
        }
        return member;
    }
}