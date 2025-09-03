import axios from "axios";

const HOLIDAY_URI = "http://localhost:9927/leavemanagementsystem/holidays";
const EMPLOYEE_URI = "http://localhost:9927/leavemanagementsystem/employee";
const LEAVE_URI = "http://localhost:9927/leavemanagementsystem/leave";

const getHolidayList = () => {
    return axios.get(HOLIDAY_URI + "/all");
}

const getEmployee = (id) => {
    return axios.get(EMPLOYEE_URI + `/getdetails/${id}`)
}

const applyLeave = (payload) => {
    return axios.post(LEAVE_URI + "/applyleave", payload);
}

const employeeLogin = (payload) => {
    return axios.post(EMPLOYEE_URI+"/login", payload)
}

const viewLeaveHistoryOfEmployee = (empId) => {
    return axios.get(LEAVE_URI + `/history/${empId}`)
}

const cancelLeave = (id) => {
    return axios.put(LEAVE_URI + `/cancelleave/${id}`)
}

const withdrawLeave = (id)=>{
    return axios.put(LEAVE_URI+`/withdrawleave/${id}`)
}

const managerEmployees = (managerId) => {
    return axios.get(EMPLOYEE_URI + `/manager/${managerId}`)
}

const getEmployeeWithApplied = (id) => {
    return axios.get(LEAVE_URI+`/leaveappliedbymanager/${id}`);
}

const verifyleave = (id, status, remarks) => {
    return axios.put(LEAVE_URI+`verifyleave/${id}?status=${status}&&remarks=${remarks}`)
}
export {    getHolidayList, getEmployee, 
            applyLeave, employeeLogin, 
            viewLeaveHistoryOfEmployee, 
            cancelLeave, withdrawLeave,
            managerEmployees, getEmployeeWithApplied, verifyleave
}