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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



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
}
