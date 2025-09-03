package com.sutherland.lms.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class PublicHolidays {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "holiday_seq")
    @SequenceGenerator(name = "holiday_seq", sequenceName = "holiday_sequence", allocationSize = 1)
    private Long id;

    @Column(columnDefinition = "date")
    private LocalDate holidayDate;

    @Column(length = 50)
    private String holidayDetails;

    public Long getId() {
        return id;
    }

    public LocalDate getHolidayDate() {
        return holidayDate;
    }

    public void setHolidayDate(LocalDate holidayDate) {
        this.holidayDate = holidayDate;
    }

    public String getHolidayDetails() {
        return holidayDetails;
    }

    public void setHolidayDetails(String holidayDetails) {
        this.holidayDetails = holidayDetails;
    }

    @Override
    public String toString() {
        return "PublicHolidays [id=" + id + ", holidayDate=" + holidayDate + ", holidayDetails=" + holidayDetails + "]";
    }
}
