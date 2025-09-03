package com.sutherland.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sutherland.lms.entity.PublicHolidays;
import com.sutherland.lms.service.PublicHolidayService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/holidays")
public class PublicHolidaysController {

    @Autowired
    private PublicHolidayService service;

    
    @PostMapping("/addholidaydetails")
    public PublicHolidays addHoliday(@RequestBody PublicHolidays holiday) {
        return service.addHoliday(holiday); 
    }

    
    @GetMapping("/all")
    public List<PublicHolidays> getAllHolidays() {
        return service.getAllHolidaysList();
    }
}
