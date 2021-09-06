package com.vmu.App.repository.RepoCard;

import java.util.List;
import java.util.Optional;

import com.vmu.App.models.Card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartReponsitory extends JpaRepository<Card, Long> {

    Optional<Card> findById(Long id);

    List<Card> findByUserid(Long userid);
}
