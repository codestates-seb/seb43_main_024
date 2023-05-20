package com.codestates.TILTILE.auth.userdetails;

import com.codestates.TILTILE.auth.utils.CustomAuthorityUtils;
import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public MemberDetailsService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);
    }

    // 사용자 정보를 나타내는 내부 클래스
    private final class MemberDetails extends Member implements UserDetails {
        // 생성자를 통해 Member 객체로부터 MemberDetails를 초기화합니다.
        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            // MemberDetails 객체의 역할(Roles) 정보를 사용하여 인증된 사용자의 권한을 생성합니다.
            return authorityUtils.createAuthorities(this.getRoles());
        }
        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            // 사용자 계정이 만료되지 않았음을 반환합니다.
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            // 사용자 계정이 잠기지 않았음을 반환합니다.
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            // 사용자 자격 증명(비밀번호)이 만료되지 않았음을 반환합니다.
            return true;
        }

        @Override
        public boolean isEnabled() {
            // 사용자 계정이 활성화되어 있음을 반환합니다.
            return true;
        }
    }
}