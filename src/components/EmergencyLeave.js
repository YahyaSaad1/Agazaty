import { useState } from "react";
import Btn from "./Btn";
import Swal from "sweetalert2";

function EmergencyLeave(){
    const [startDate, SetStartDate] = useState('لم يتم التحديد');
    const [numberOfDays, SetNumberOfDays] = useState('لم يتم التحديد');
    const [notes, setNotes] = useState('لا يوجد');

    const swal = () => {
        Swal.fire({
            title:`<span style='color:#0d6efd;'>هل أنت متأكد من إرسال الاجازة ؟</span>`,
            html: `
                <p dir='rtl'><span style='font-weight: bold;'>نوع الاجازة:</span> <span style='color:#0d6efd;'>عارضة</span></p>
                <p dir='rtl'><span style='font-weight: bold;'>تاريخ بداية الاجازة:</span> <span style='color:#0d6efd;'>${startDate}</span></p>
                <p dir='rtl'><span style='font-weight: bold;'>عدد أيام الاجازة:</span> <span style='color:#0d6efd;'>${numberOfDays}</span></p>
                <p dir='rtl'><span style='font-weight: bold;'>ملحوظاتك:</span> <span style='color:#0d6efd;'>${notes}</span></p>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title:`<span style='color:#0d6efd;' dir="rtl">تم إرسال الاجازة بنجاح.</span>`,
                icon: "success",
                confirmButtonText: "تتبع الاجازات",
                confirmButtonColor: "#0d6efd",
                });
            }
            });
        }    
    return(
        <>
            <div className="row">
                <div className="col-sm-12 col-md-6 mt-3">
                    <label htmlFor="exampleInputDate1" className="form-label">تاريخ بداية الاجازة</label>
                    <input type="date" onChange={(e)=>SetStartDate(e.target.value)} className="form-control" id="exampleInputDate1" max={new Date(new Date().setDate(new Date().getDate()-1)).toISOString().split("T")[0]} />
                </div>

                <div className="col-sm-12 col-md-6 mt-3">
                    <label htmlFor="exampleInputDeputy" className="form-label">اختر أيام الاجازة</label>
                    <select
                        className="form-select"
                        id="exampleInputDeputy"
                        aria-label="Default select example"
                        onChange={(e)=> SetNumberOfDays(e.target.value)}
                    >
                        <option value="">عدد أيام الاجازة</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        
                    </select>
                </div>

                <div className="col-sm-12 col-md-6 mt-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">الملاحظات</label>
                    <textarea className="form-control" onChange={(e)=> setNotes(e.target.value)} id="exampleFormControlTextarea1" rows="1" placeholder="اكتب ملاحظاتك"></textarea>
                </div>
            </div>

            <div onClick={swal} className="d-flex justify-content-center mt-3">
                <Btn name='إرسال الاجازة' link='' class='btn-primary w-50' />
            </div>
        </>
    )
}

export default EmergencyLeave;