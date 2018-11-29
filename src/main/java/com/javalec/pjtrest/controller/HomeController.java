package com.javalec.pjtrest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	//, "/write_view" probably not needed
    @RequestMapping(value = {"/"}) //et cetera... all directories return one page "index.html"
    public String index() {
        return "index";
    }

}