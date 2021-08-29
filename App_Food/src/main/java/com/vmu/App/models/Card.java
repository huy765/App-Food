package com.vmu.App.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "card")
public class Card {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	@Column(name = "userid")
	Long userid;

	@Column(name = "foodid")
	Long foodid;

	@Column(name = "foodname")
	String foodname;

	@Column(name = "price")
	double price;
	
	@Column(name = "qty")
	int qty;

	public Card(){
		super();
	}

	public Card(Long userid, Long foodid,String foodname,Double price,int qty){
		this.userid = userid;
		this.foodid = foodid;
		this.foodname = foodname;
		this.price = price;
		this.qty = qty;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Long getFoodid() {
		return foodid;
	}

	public void setFoodid(Long foodid) {
		this.foodid = foodid;
	}

	public String getFoodname() {
		return foodname;
	}

	public void setFoodname(String foodname) {
		this.foodname = foodname;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}
}
