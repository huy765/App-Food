package com.vmu.App.repository.RepoCard;

import java.util.List;

import com.vmu.App.models.Card;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartReponsitory extends JpaRepository<Card, Long> {
    List<Card> findByUserid(Long userid);
}
