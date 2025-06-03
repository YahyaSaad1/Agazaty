import { useEffect, useState } from "react";
import EmergencyLeave from "./EmergencyLeave";
import NormalLeave from "./NormalLeave";
import SickLeave from "./SickLeave";
import BtnLink from "./BtnLink";

function Leave(props) {
    const rule = props;
    const [typeLeave, setTypeLeave] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [employees, setEmployees] = useState([]);
    const [leave, setLeave] = useState([]);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9000/employees`)
            .then((res) => res.json())
            .then((data) => setEmployees(data))
            .catch((error) => console.error("Error fetching employees:", error));
    }, []);

    useEffect(() => {
        if (employeeID) {
            fetch(`http://localhost:9000/employees/${employeeID}`)
                .then((res) => res.json())
                .then((data) => setEmployee(data))
                .catch((error) => console.error("Error fetching employee:", error));
        }
    }, [employeeID]);

    useEffect(() => {
        if (typeLeave && employeeID) {
            fetch(`http://localhost:9000/employees/${employeeID}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.leaves && data.leaves[typeLeave]) {
                        setLeave(data.leaves[typeLeave]);
                    } else {
                        console.warn(`No data found for leave type: ${typeLeave}`);
                        setLeave([]);
                    }
                })
                .catch((error) => console.error("Error fetching leaves:", error));
        }
    }, [typeLeave, employeeID]);

    const LeaveNumbers = leave.totalBalance ;
    const Number = leave.totalBalance - leave.takenBalance ;

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">إضافة اجازة لموظف</h2>
                </div>
                {typeLeave === "" && employeeID !== "" ? (
                    <div className="p-3">
                        <BtnLink name={`رصيد الاجازات ل${employee?.firstName} : ${LeaveNumbers || ""}`} link='/agazaty' class='btn btn-primary m-0' />
                    </div>
                ) : typeLeave !== "" && employeeID !== "" ? (
                    <div className="p-3">
                        <BtnLink name={`رصيد الاجازات ال${leave.type} ل${employee.firstName} : ${Number}`} link='/agazaty' class='btn btn-primary m-0' />
                    </div>
                ) : null}
            </div>

            <div className="mt-3">
                {rule.type === 'manager,hr' ? (
                    <div className="row gap3 mb-4">
                        <div className="col-12">
                            <label htmlFor="selectTypeEmployee" className="form-label">اختر الموظف</label>
                            <select
                                className="form-select"
                                onChange={(e) => setEmployeeID(e.target.value)}
                                id="selectTypeEmployee"
                                aria-label="Default select example"
                            >
                                <option value="">اختر الموظف</option>
                                {employees.map((emp, index) => (
                                    <option key={index} value={emp.id}>
                                        {emp.firstName} {emp.secondName} ({emp.department})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="row gap3 mt-3">
                <div className="col-12">
                    <label htmlFor="selectTypeLeave" className="form-label">اختر نوع الاجازة</label>
                    <select
                        className="form-select"
                        onChange={(e) => setTypeLeave(e.target.value.toString())}
                        id="selectTypeLeave"
                        aria-label="Default select example"
                    >
                        <option value="">اختر نوع الاجازة</option>
                        <option value="0">اعتيادية</option>
                        <option value="1">عارضة</option>
                        <option value="2">مرضية</option>
                    </select>
                </div>
            </div>
            
            <div>
                {typeLeave === "0" ? (
                    <NormalLeave />
                ) : typeLeave === "1" ? (
                    <EmergencyLeave />
                ) : typeLeave === "2" ? (
                    <SickLeave />
                ) : null}
            </div>
        </div>
    );
}

export default Leave;