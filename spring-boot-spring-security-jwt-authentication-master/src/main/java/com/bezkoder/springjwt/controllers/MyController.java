package com.bezkoder.springjwt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.springjwt.models.Blood_Bank_Details;
import com.bezkoder.springjwt.models.Donor_Details;
import com.bezkoder.springjwt.repository.Blood_Bank_Details_Dao;
import com.bezkoder.springjwt.repository.Donor_Details_Dao;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/user") 
class MyController 
{
	@Autowired
	private Blood_Bank_Details_Dao bbdd;
	
	@Autowired
	private Donor_Details_Dao ddd;
	
	@GetMapping("/blood_bank_details")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Blood_Bank_Details> get_blood_ban_details()
	{
		return bbdd.findAll();
	}
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/add_bank_details")
	public String add_bank_details(@RequestBody Blood_Bank_Details obj)
	{
		bbdd.save(obj);
		return "True";
	}
	
	@GetMapping("delete_bank/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public String delete_bank(@PathVariable("id") long i)
	{
		bbdd.deleteById(i);
		return "True";
	}
	
	@GetMapping("/donor_details")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Donor_Details> get_Donor()
	{
		return ddd.findAll();
	}
	
	@PostMapping("/add_donor_details")
	@PreAuthorize("hasRole('ADMIN')")
	public String add_donor_details(@RequestBody Donor_Details obj)
	{
		System.out.println("Hello");
		ddd.save(obj);
		return "True";
	}
	@GetMapping("delete_donor/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public String delete_donor(@PathVariable("id") long i)
	{
		ddd.deleteById(i);
		return "True";
	}
}
