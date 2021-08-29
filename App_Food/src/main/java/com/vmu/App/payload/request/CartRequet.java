package com.vmu.App.payload.request;

public class CartRequet {
    
    private Long userid;

    private Long foodid;

    private String namefood;

    private Double price;

    private int qty;

    public CartRequet(Long userid,Long foodid,String namefood,Double price,int qty){
        this.userid = userid;
        this.foodid = foodid;
        this.namefood = namefood;
        this.price = price;
        this.qty = qty;
    }

    public Long getFoodid() {
        return foodid;
    }

    public void setFoodid(Long foodid) {
        this.foodid = foodid;
    }
    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getNamefood() {
        return namefood;
    }

    public void setNamefood(String namefood) {
        this.namefood = namefood;
    }

    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
    
}
