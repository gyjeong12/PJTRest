package com.javalec.pjtrest.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
@Table (name="bdtoes")
public class BDto {
	//From my understanding, JPA interprets camelCase as equivalent to underscore. e.g. bName = b_name in sql query
	@Id
	@Column(name="b_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int bId;
	//@Column(name = "bName")
	private String bName;
	//@Column(name = "bTitle")
	private String bTitle;
	@Column(name = "b_content")
	private String bContent;
	//@Column(name = "bDate")
	@Temporal(TemporalType.TIMESTAMP)
	private Date bDate;
	/*@Column(name = "bHit")
	private int bHit;
	@Column(name = "bGroup")
	private int bGroup;
	@Column(name = "bStep")
	private int bStep;
	@Column(name = "bIndent")
	private int bIndent;*/
	
	public BDto() { } 
	
	public BDto(int bId, String bName, String bTitle, String bContent, Date bDate) { // int bHit, int bGroup, int bStep, int bIndent) {
		this.bId = bId;
		this.bName = bName;
		this.bTitle = bTitle;
		this.bContent = bContent;
		this.bDate = bDate;
		/*this.bHit = bHit;
		this.bGroup = bGroup;
		this.bStep = bStep;
		this.bIndent = bIndent;*/
	}
}
