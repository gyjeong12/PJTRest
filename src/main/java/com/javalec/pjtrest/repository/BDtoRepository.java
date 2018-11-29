package com.javalec.pjtrest.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.javalec.pjtrest.domain.BDto;

public interface BDtoRepository extends PagingAndSortingRepository<BDto, Integer>{ //change to CrudRepository or JPARepository if it jpa doesn't work
	
	List<BDto> findByBId(String bId);
	//This repository contains preconfigured JSON export via GET. It will contain a list of BDtos and an Integer (their position). 
}