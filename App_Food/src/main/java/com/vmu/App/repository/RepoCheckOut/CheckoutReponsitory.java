package com.vmu.App.repository.RepoCheckOut;

import java.util.List;

import com.vmu.App.models.CheckOut;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckoutReponsitory extends JpaRepository<CheckOut,Long> {
    List<CheckOut> findAll();
    List<CheckOut> findByNgaytao(String ngaytao);
}