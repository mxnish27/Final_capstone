package com.sutherland.lms.service;

import java.util.List;
import com.sutherland.lms.entity.PublicHolidays;

public interface PublicHolidayService {
    List<PublicHolidays> getAllHolidaysList();
    PublicHolidays addHoliday(PublicHolidays holiday);
}
