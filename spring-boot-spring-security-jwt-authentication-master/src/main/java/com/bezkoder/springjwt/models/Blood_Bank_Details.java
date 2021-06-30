package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Blood_Bank_Details 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String name;
	private String blood_type;
	private String address;
	private int units;
	private String coll_date;
	public Blood_Bank_Details() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Blood_Bank_Details(long id, String name, String blood_type, String address, int units, String coll_date) {
		super();
		this.id = id;
		this.name = name;
		this.blood_type = blood_type;
		this.address = address;
		this.units = units;
		this.coll_date = coll_date;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBlood_type() {
		return blood_type;
	}
	public void setBlood_type(String blood_type) {
		this.blood_type = blood_type;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getUnits() {
		return units;
	}
	public void setUnits(int units) {
		this.units = units;
	}
	public String getColl_date() {
		return coll_date;
	}
	public void setColl_date(String coll_date) {
		this.coll_date = coll_date;
	}
	
}
