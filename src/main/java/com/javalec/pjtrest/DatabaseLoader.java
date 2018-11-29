package com.javalec.pjtrest;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.javalec.pjtrest.domain.BDto;
import com.javalec.pjtrest.repository.BDtoRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {
	
	private final BDtoRepository repository;
	
	
	
	@Autowired
	public DatabaseLoader(BDtoRepository repository) {
		this.repository = repository;
	}
	
	@Override 
	public void run(String... strings) throws Exception {
//		this.repository.save(new BDto(0, "Bob", "Test Title", "This is a test", Calendar.getInstance().getTime())); //, 0, 0, 0, 0));
//		this.repository.findAll().forEach(bdto -> System.out.println(bdto.getBId()));
	}
}