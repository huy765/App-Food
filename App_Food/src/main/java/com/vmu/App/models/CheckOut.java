package com.vmu.App.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "checkout")
public class CheckOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ngaytao")
    private String ngaytao;

    @Column(name = "diachinhan")
    private String diachinhan;

    @Column(name = "sdtnhanhang")
	private String sdtnhanhang;

    @Column(name = "hotennguoihan")
	private String hotennguoihan;

    @Column(name = "idcart")
    private Long idcart;

    @Column(name = "foodid")
    private Long foodid;

    @Column(name = "foodname")
    private String foodname;

    @Column(name = "linkimage")
    private String linkimage;

    @Column(name = "qty")
    private int qty;

    @Column(name = "price")
    private Double price;

    @Column(name = "userid")
    private Long userid;

    @Column(name = "tonggiatri")
    private Double tonggiatri;

    public CheckOut(){
        super();
    }

    public CheckOut(String ngaytao,String diachinhan,String sdtnhanhang,String hotennguoihan,Long idcart,Long foodid,String foodname,String linkimage,int qty,Double price,Long userid,Double tonggiatri){
        this.ngaytao = ngaytao;
        this.diachinhan = diachinhan;
        this.sdtnhanhang = sdtnhanhang;
        this.hotennguoihan = hotennguoihan;
        this.idcart = idcart;
        this.foodid = foodid;
        this.foodname = foodname;
        this.linkimage = linkimage;
        this.qty = qty;
        this.price = price;
        this.userid = userid;
        this.tonggiatri = tonggiatri;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNgaytao() {
        return ngaytao;
    }

    public void setNgaytao(String ngaytao) {
        this.ngaytao = ngaytao;
    }

    public String getDiachinhan() {
        return diachinhan;
    }

    public void setDiachinhan(String diachinhan) {
        this.diachinhan = diachinhan;
    }

    public String getSdtnhanhang() {
        return sdtnhanhang;
    }
    public void setSdtnhanhang(String sdtnhanhang) {
        this.sdtnhanhang = sdtnhanhang;
    }

    public String getHotennguoihan() {
        return hotennguoihan;
    }
    public void setHotennguoihan(String hotennguoihan) {
        this.hotennguoihan = hotennguoihan;
    }

    public Long getIdcart() {
        return idcart;
    }
    public void setIdcart(Long idcart) {
        this.idcart = idcart;
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
    public String getLinkimage() {
        return linkimage;
    }
    public void setLinkimage(String linkimage) {
        this.linkimage = linkimage;
    }
    public int getQty() {
        return qty;
    }
    public void setQty(int qty) {
        this.qty = qty;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public Long getUserid() {
        return userid;
    }
    public void setUserid(Long userid) {
        this.userid = userid;
    }
    public Double getTonggiatri() {
        return tonggiatri;
    }
    public void setTonggiatri(Double tonggiatri) {
        this.tonggiatri = tonggiatri;
    }

    
}
