import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BtnLink from "../components/BtnLink";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../Data" ;

function Departments(){
    const [departments, setDepartments] = useState([])

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Department/GetAllDepartments`)
        .then((res)=> res.json())
        .then((data)=> setDepartments(data))
    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من استعادة بيانات هذا القسم!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "نعم، احذفه!",
            cancelButtonText: "إلغاء",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://agazatyapi.runasp.net/api/Department/UpdateDepartment/${id}`, {
                    method: "DELETE",
                }).then(() => {
                    setDepartments(departments.filter((department) => department.id !== id));
                    Swal.fire({
                        title: "تم الحذف!",
                        text: "تم حذف القسم بنجاح.",
                        icon: "success",
                        confirmButtonText: "موافق",
                    });
                }).catch((error) => {
                    Swal.fire({
                        title: "خطأ!",
                        text: "حدث خطأ أثناء حذف الموظف.",
                        icon: "error",
                        confirmButtonText: "حسناً",
                    });
                });
            }
        });
    };

    return(
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">الأقسام</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='إضافة قسم' link='/add-department' class="btn btn-primary m-0 me-2"/>
                </div>            
            </div>
            <div className="row">
                <div>
                    <table className="m-0 table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>اسم القسم</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>كود القسم</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>
                                    تاريخ الإنشاء
                                    {/* <FontAwesomeIcon icon={faUpDown} className="me-2" /> */}
                                </th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>مدير القسم</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>المزيد</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.length > 0 ? (
                                departments.map((department ,index)=>(
                                    <tr key={index}>
                                    <th style={{height:'50px'}}>{department.name}</th>
                                    <th style={{height:'50px'}}>{department.code}</th>
                                    <th style={{height:'50px'}}>{department.createDate}</th>
                                    <th style={{height:'50px'}}>{department.managerName}</th>
                                    <th style={{height:'50px'}}>
                                        <Link to={`/department/${department.id}/edit`}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="blue" className="fontt" />
                                        </Link>

                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            color="red" 
                                            className="fontt" 
                                            style={{ cursor: "pointer", marginLeft: "10px" }} 
                                            onClick={() => handleDelete(department.id)} 
                                        />
                                    </th>
                                </tr>  
                                )
                            ))
                            :   <tr>
                                    <td colSpan="5" className="text-center text-danger p-3">لا يوجد أقسام حتى الآن</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Departments;