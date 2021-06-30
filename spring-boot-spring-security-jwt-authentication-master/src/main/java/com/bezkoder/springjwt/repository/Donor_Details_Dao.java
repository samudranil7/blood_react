package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Donor_Details;

@Service
public interface Donor_Details_Dao extends JpaRepository<Donor_Details,Long> 
{

}
