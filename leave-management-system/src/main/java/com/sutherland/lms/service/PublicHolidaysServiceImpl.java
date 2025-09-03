package com.sutherland.lms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sutherland.lms.entity.PublicHolidays;
import com.sutherland.lms.repo.PublicHolidaysRepo;

@Service
public class PublicHolidaysServiceImpl implements PublicHolidayService {

    @Autowired
    private PublicHolidaysRepo repo;

    @Override
    public List<PublicHolidays> getAllHolidaysList() {
        return repo.findAll();
    }

    @Override
    public PublicHolidays addHoliday(PublicHolidays holiday) {
        return repo.save(holiday);
    }
}
