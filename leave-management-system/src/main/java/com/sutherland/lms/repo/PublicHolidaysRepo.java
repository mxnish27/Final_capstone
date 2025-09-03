package com.sutherland.lms.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sutherland.lms.entity.PublicHolidays;

@Repository
public interface PublicHolidaysRepo extends JpaRepository<PublicHolidays, Long> {
}
