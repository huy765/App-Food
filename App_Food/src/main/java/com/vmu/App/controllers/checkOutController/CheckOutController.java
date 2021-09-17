package com.vmu.App.controllers.checkOutController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import com.vmu.App.models.CheckOut;
import com.vmu.App.models.User;
import com.vmu.App.repository.UserRepository;
import com.vmu.App.repository.RepoCard.CartReponsitory;
import com.vmu.App.repository.RepoCheckOut.CheckoutReponsitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/app")
public class CheckOutController {
    
    @Autowired
    public CartReponsitory cartReponsitory;

    @Autowired
    public CheckoutReponsitory checkoutReponsitory;

    @Autowired
    public UserRepository userRepository;

    @GetMapping(value = "/MyOrder")
    public List<CheckOut> getCheckOutAllOrder(){
        List<CheckOut> co = checkoutReponsitory.findAll();
        return co;
    }

    @GetMapping(value = "/MyOrder/{idUser}")
    public List<CheckOut> getCheckOutOrder(@PathVariable Long idUser){
        List<CheckOut> co = checkoutReponsitory.findByUserid(idUser);
        return co;
    }
    
    @GetMapping("/orders")
    public List<CheckOut> getListcOrder(){
        return checkoutReponsitory.findAll();
    }
    @GetMapping("/orderByNgaytao")
    public List<CheckOut> getListOrderByNgaytao(@RequestParam(value = "ngaytao" ,defaultValue = "15/9/2021") String ngaytao){
        return checkoutReponsitory.findByNgaytao(ngaytao);
    }
    @PostMapping(value="/order")
    public ResponseEntity<String> postMethodName(@RequestBody CheckOut entity) {
        System.out.println(entity.getNgaytao());
        Optional<User> us = userRepository.findById(entity.getUserid());
        String stateorder = "init";
        if(us.isEmpty() == false){
            
            CheckOut order = new CheckOut(entity.getNgaytao(),stateorder,entity.getDiachinhan(),entity.getSdtnhanhang(),entity.getHotennguoihan(),entity.getIdcart(),entity.getFoodid(),entity.getFoodname(),entity.getLinkimage(),entity.getQty(),entity.getPrice(),entity.getUserid(),entity.getTonggiatri());
            checkoutReponsitory.save(order);
            cartReponsitory.deleteById(entity.getIdcart());
            return ResponseEntity.ok("Đặt hàng thành công");
        }
        return ResponseEntity.ok("Xảy ra lỗi");
    }


    @PutMapping(value = "/MyOrder/{id}/{stateorder}")
    public List<CheckOut> PutMethod(@PathVariable Long id,@PathVariable String stateorder){
        Optional<CheckOut> checkout = checkoutReponsitory.findById(id);
        CheckOut CheckOutUpdate = new CheckOut();
		if(checkout.isEmpty() == false){
			CheckOutUpdate.setId(id);
			CheckOutUpdate.setDiachinhan(checkout.get().getDiachinhan());
			CheckOutUpdate.setFoodid(checkout.get().getFoodid());
			CheckOutUpdate.setFoodname(checkout.get().getFoodname());
			CheckOutUpdate.setHotennguoihan(checkout.get().getHotennguoihan());
			CheckOutUpdate.setIdcart(checkout.get().getIdcart());
            CheckOutUpdate.setLinkimage(checkout.get().getLinkimage());
			CheckOutUpdate.setNgaytao(checkout.get().getNgaytao());
            CheckOutUpdate.setPrice(checkout.get().getPrice());
            CheckOutUpdate.setQty(checkout.get().getQty());
            CheckOutUpdate.setSdtnhanhang(checkout.get().getSdtnhanhang());
            CheckOutUpdate.setStateorder(stateorder);
            CheckOutUpdate.setTonggiatri(checkout.get().getTonggiatri());
            CheckOutUpdate.setUserid(checkout.get().getUserid());
		}
		checkoutReponsitory.save(CheckOutUpdate);
		List<CheckOut> listMyCheckOut = checkoutReponsitory.findAll();
		return listMyCheckOut;
    }

}