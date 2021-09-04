package com.vmu.App.controllers.foodController;

import java.util.List;

import com.vmu.App.models.Food;
import com.vmu.App.repository.RopoFood.FoodReponsitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/app")
public class FoodController {

    @Autowired
    public FoodReponsitory foodReponsitory;

    
    
    @GetMapping("/produced")
    public List<Food> getListFood(){
        return foodReponsitory.findAll();
    }

    @GetMapping("/producedById")
    public List<Food> getListFoodByCategory(@RequestParam(value = "id" ,defaultValue = "2") String id){
        Long idCategory = Long.parseLong(id);
        return foodReponsitory.findByIdCategory(idCategory);
    }
	@PostMapping(value="/addproduced")
    public List<Food> postListFood(@RequestBody Food food) {
        if (!food.getNamefood().isEmpty() && !food.getPrice().isEmpty() && !food.getDetail().isEmpty()  && !food.getLinkimage().isEmpty()){
          Food entity = new Food();
          entity.setNamefood(food.getNamefood());
          entity.setPrice(food.getPrice());
          entity.setDetail(food.getDetail());
          entity.setIdCategory(food.getIdCategory());
          entity.setLinkimage(food.getLinkimage());
          foodReponsitory.save(entity);
        }	
        //return foodReponsitory.findAll();
        List<Food> listItemFood = foodReponsitory.findAll();
		return listItemFood;
      }
}
