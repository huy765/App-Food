package com.vmu.App.controllers.checkOutController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import com.vmu.App.models.CheckOut;
import com.vmu.App.models.User;
import com.vmu.App.repository.UserRepository;
import com.vmu.App.repository.RepoCard.CartReponsitory;
import com.vmu.App.repository.RepoCheckOut.CheckoutReponsitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/app")
public class CheckOutController {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public CheckoutReponsitory checkoutReponsitory;

    @Autowired
    public CartReponsitory cartReponsitory;

    @PostMapping(value="/order")
    public ResponseEntity<String> postMethodName(@RequestBody CheckOut entity) {
        System.out.println(entity.getNgaytao());
        Optional<User> us = userRepository.findById(entity.getUserid());
        if(us.isEmpty() == false){
            CheckOut order = new CheckOut(entity.getNgaytao(),entity.getDiachinhan(),entity.getSdtnhanhang(),entity.getHotennguoihan(),entity.getIdcart(),entity.getFoodid(),entity.getFoodname(),entity.getLinkimage(),entity.getQty(),entity.getPrice(),entity.getUserid(),entity.getTonggiatri());
            checkoutReponsitory.save(order);
            cartReponsitory.deleteById(entity.getIdcart());
            return ResponseEntity.ok("Đặt hàng thành công");
        }

        return ResponseEntity.ok("Xảy ra lỗi");
        
    } 
}
