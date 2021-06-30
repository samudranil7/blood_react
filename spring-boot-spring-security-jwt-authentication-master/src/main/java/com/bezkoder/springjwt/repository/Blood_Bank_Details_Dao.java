package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Blood_Bank_Details;


@Service
public interface Blood_Bank_Details_Dao extends JpaRepository<Blood_Bank_Details,Long>
{

}
