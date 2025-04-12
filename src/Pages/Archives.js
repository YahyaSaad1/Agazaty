import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import BtnLink from "../components/BtnLink";
import { faCalendarDays, faIdCard, faPenToSquare, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../Data" ;

function Archives() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        fetch(`http://agazatyapi.runasp.net/api/Account/GetAllNonActiveUsers`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);
            })
            .catch(error => {
                console.error("Error fetching employees:", error);
                setUsers([]);
            });
    };

    const ReActiveUser = (userId) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "سيتم إلغاء أرشفة الموظف وسيكون مرئيًا في القائمة!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "نعم، إلغاء الأرشفة!",
            cancelButtonText: "إلغاء"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://agazatyapi.runasp.net/api/Account/ReActiveUser/${userId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            throw new Error(`خطأ في إلغاء الأرشفة: ${text || response.status}`);
                        });
                    }
                    return response.json();
                })
                .then(() => {
                    Swal.fire("تم إلغاء الأرشفة!", "تم إلغاء أرشفة الموظف بنجاح.", "success");
                    fetchEmployees();
                })
                .catch(error => {
                    console.error("Error reactivating user:", error);
                    Swal.fire("خطأ!", `حدث خطأ أثناء إلغاء أرشفة الموظف: ${error.message}`, "error");
                });
            }
        });
    };
    

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">الموظفين الغير نشيطين</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='الموظفين النشيطين' link='/employees/active' class="btn btn-primary m-0"/>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="m-0 table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>الاسم</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>القسم</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>تاريخ التعيين</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>رقم الهاتف</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>المزيد</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td style={{ height: '50px' }}>{user.fullName}</td>
                                        <td style={{ height: '50px' }}>{user.departmentName}</td>
                                        <td style={{ height: '50px' }}>{user.hireDate}</td>
                                        <td style={{ height: '50px' }}>{user.phoneNumber}</td>
                                        <td style={{ height: '50px' }}>
                                            <Link to={`/profile/user/${user.id}`} className="ms-1">
                                                <FontAwesomeIcon icon={faIdCard} color="green" className="fontt" />
                                            </Link>
                                            <Link to={`/employee/${user.id}/edit`}>
                                                <FontAwesomeIcon icon={faPenToSquare} color="blue" className="fontt" />
                                            </Link>
                                            <FontAwesomeIcon 
                                                icon={faUserPlus}
                                                color="green"
                                                onClick={() => ReActiveUser(user.id)}
                                                className="fontt" 
                                                style={{ cursor: "pointer", marginLeft: "10px" }} 
                                            />
                                        </td>
                                    </tr>  
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>لا يوجد موظفون غير نشيطين</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Archives;