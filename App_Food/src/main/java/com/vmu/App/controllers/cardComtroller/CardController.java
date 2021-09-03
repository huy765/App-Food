package com.vmu.App.controllers.cardComtroller;

import java.util.List;
import java.util.Optional;

import com.vmu.App.models.Card;
import com.vmu.App.models.User;
import com.vmu.App.payload.response.CartResponse;
import com.vmu.App.repository.UserRepository;
import com.vmu.App.repository.RepoCard.CartReponsitory;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/app")
public class CardController {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public CartReponsitory cardRepository;

	@GetMapping(value = "/listbyid/{id}")
	public List<Card> getListItemCardByIdUser(@PathVariable Long id){
		
		Optional<User> us = userRepository.findById(id);

		if(us.isEmpty() == false){
			
			return cardRepository.findByUserid(id);
		}
		return null;
	}

	@PostMapping(value="/addCart")
	public CartResponse postMethodName(@RequestBody Card card) {

		Long id = Long.parseLong(card.getUserid().toString());

		Optional<User> us = userRepository.findById(id);

		if(us.isEmpty() == false){
			
			cardRepository.save(card);
		}

		return new CartResponse("Xảy ra lỗi");
	}

	@PutMapping(value="/update")
	public ResponseEntity<Card> updateMethodName(@RequestBody Card carditem) {

		Optional<Card> cart = cardRepository.findById(carditem.getId());

		Card cartUpdate = new Card();

		if(cart.isEmpty() == false){
			cartUpdate.setId(carditem.getId());
			cartUpdate.setFoodid(carditem.getFoodid());
			cartUpdate.setFoodname(carditem.getFoodname());
			cartUpdate.setLinkimage(carditem.getLinkimage());
			cartUpdate.setPrice(carditem.getPrice());
			cartUpdate.setQty(carditem.getQty());
			cartUpdate.setUserid(carditem.getUserid());
		}
		cardRepository.save(cartUpdate);
		return ResponseEntity.ok(cartUpdate);
	}
}
