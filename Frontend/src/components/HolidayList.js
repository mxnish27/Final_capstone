import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getHolidayList } from "../service/ApiServices";
import toast from "react-hot-toast";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      const {data} = await getHolidayList();
      console.log(data);
      setHolidays(data);
      toast.success("Holiday List here...")
    } catch (error) {
      toast.error("Something Wrong...")
      console.log(error)
    }
  }

  return (
    <div className="table-container">
      <h2>Holiday List</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Holiday Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {holidays.length > 0 ? (
            holidays.map((holiday, index) => (
              <tr key={holiday._id || index}>
                <td>{index + 1}</td>
                <td>{holiday.holidayDetails}</td>
                <td>{holiday.holidayDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No Holidays Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayList;