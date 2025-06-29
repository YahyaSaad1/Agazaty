import { useEffect, useState } from "react";
import "../CSS/LeaveBalance.css";
import { BASE_API_URL, token } from "../server/serves";

function ShortData() {
const [department, setDepartments] = useState([]);
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [waitingLeaves, setWaitingLeaves] = useState([]);
  const [users, setUsers] = useState([]);
  const [leaves, setLeaves] = useState({});

  // دالة مساعدة لمعالجة الردود
  const handleResponse = async (res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    // لو فيه رسالة (يعني مفيش بيانات فعلية) ارجع مصفوفة فارغة
    if (data && typeof data === "object" && "message" in data) {
      return [];
    }
    return data;
  };

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Department/GetAllDepartments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(handleResponse)
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllAcceptedNormalLeaves`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(handleResponse)
      .then((data) => setAcceptedLeaves(data))
      .catch((err) => console.error("Error fetching accepted leaves:", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllRejectedNormalLeaves`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(handleResponse)
      .then((data) => setRejectedLeaves(data))
      .catch((err) => console.error("Error fetching rejected leaves:", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllWaitingNormalLeaves`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(handleResponse)
      .then((data) => setWaitingLeaves(data))
      .catch((err) => console.error("Error fetching waiting leaves:", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Account/GetAllActiveUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(handleResponse)
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    setLeaves({
      numberLeave: {
        type: "عدد الإجازات",
        num:
          (acceptedLeaves?.length || 0) +
          (rejectedLeaves?.length || 0) +
          (waitingLeaves?.length || 0),
      },
      departments: {
        type: "الاقسام",
        num: department?.length || 0,
      },
      employees: {
        type: "الموظفين",
        num: users?.length || 0,
      },
      acceptableLeave: {
        type: "الإجازات المقبولة",
        num: acceptedLeaves?.length || 0,
      },
      rejectedLeaves: {
        type: "الإجازات المرفوضة",
        num: rejectedLeaves?.length || 0,
      },
      pendingLeave: {
        type: "الإجازات المُعلقة",
        num: waitingLeaves?.length || 0,
      },
    });
  }, [department, acceptedLeaves, rejectedLeaves, waitingLeaves, users]);

  return (
    <div>

      <div className="d-flex mb-2 mt-2" style={{marginTop:'-15px'}}>
        <h4 className="d-flex text-bold">معلومات عامة<h6 className="pt-2 pe-1">(سنوي)</h6></h4>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        {Object.values(leaves).map((leave, index) => {
          return (
            <div className="d-flex flex-column box LeaveBalance rounded-3 p-3" style={{ minWidth: "200px", flex: "1 1 30%" }} key={index}>
              <h5 className="text-bold">{leave.type}</h5>
              <h4>{leave.num.toString().replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit])}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShortData;
