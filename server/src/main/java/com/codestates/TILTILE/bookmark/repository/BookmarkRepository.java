package com.codestates.TILTILE.bookmark.repository;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByMember(Member member);
}