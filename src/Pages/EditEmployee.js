import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function EditEmployeeForHR(){
    const userId = useParams().userId;
    const [UserRole, setUsereRole] = useState("");
    const [user, setUser] = useState([]);


    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [thirdName, setThirdName] = useState('');
    const [forthName, setForthName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [nationalID, setNationalID] = useState('');
    const [position, setPosition] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [normalLeavesCount, setNormalLeavesCount] = useState('0');
    const [casualLeavesCount, setCasualLeavesCount] = useState('');
    const [nonChronicSickLeavesCount, setnonChronicSickLeavesCount] = useState('');
    const [departement_ID, setDepartement_ID] = useState('');
    const [normalLeavesCount_47, setNormalLeavesCount_47] = useState('');
    const [normalLeavesCount_81Before3Years, setNormalLeavesCount_81Before3Years] = useState('');
    const [normalLeavesCount_81Before2Years, setNormalLeavesCount_81Before2Years] = useState('');
    const [normalLeavesCount_81Before1Years, setNormalLeavesCount_81Before1Years] = useState('');
    const [howManyDaysFrom81And47, setHowManyDaysFrom81And47] = useState('');
    const [yearsOfWork, setYearsOfWork] = useState(0);
    const [monthsOfWork, setMonthsOfWork] = useState(0);
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState([]);
    const [disability, setDisability] = useState();
    const [age, setAge] = useState(0);




    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Role/GetAllRoles`)
        .then((res)=> res.json())
        .then((data)=> setRoles(data))
    }, [])

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Department/GetAllDepartments`)
        .then((res)=> res.json())
        .then((data)=> setDepartments(data))
    }, [])




    const getAge = (dateOfBirth) => {
        const dateeOfBirth = new Date(dateOfBirth);
        const todayy = new Date();
    
        let yearsDiff = todayy.getFullYear() - dateeOfBirth.getFullYear();
        let monthsDiff = todayy.getMonth() - dateeOfBirth.getMonth();
        let daysDiff = todayy.getDate() - dateeOfBirth.getDate();

        // لو كان الشهر الحالي أقل من الشهر في تاريخ الميلاد، نخصم سنة واحدة
        if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
            yearsDiff--;
        }
        return yearsDiff;
    }

    useEffect(() => {
        setAge(getAge(dateOfBirth));
    }, [dateOfBirth]);



    
    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userId}`)
        .then((res)=> res.json())
        .then((data)=> setUser(data))
    }, [userId])

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Account/GetRoleOfUser/${userId}`)
        .then((res)=> res.json())
        .then((data)=> setUsereRole(data.role))
    }, [userId])



    const [employee, setEmployee] = useState({});
    const [updatedData, setUpdatedData] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prev => ({ ...prev, [name]: value }));
    };













    const handleData = (e) => {
        e.preventDefault();
        
        // التحقق من أن جميع الحقول ممتلئة
        if (!firstName || !secondName || !thirdName || !forthName || !userName || !dateOfBirth || !position || !nationalID || !phoneNumber || 
            !howManyDaysFrom81And47 || !normalLeavesCount || !normalLeavesCount_47 || !normalLeavesCount_81Before1Years || 
            !normalLeavesCount_81Before2Years || !normalLeavesCount_81Before3Years || !nonChronicSickLeavesCount || 
            !governorate || !state || !street || !disability || !email || !hireDate || !casualLeavesCount || !departement_ID || !gender || !password) {

            Swal.fire({
                title: `<span style='color:red;'>تنبيه!</span>`,
                text: "يرجى ملء جميع الحقول المطلوبة قبل الإضافة.",
                icon: "warning",
                confirmButtonColor: "#d33",
                confirmButtonText: "حسنًا",
                });
                return; // إيقاف العملية إذا كان هناك حقول فارغة
            }
    
            const newEmployee = {firstName, secondName, thirdName, forthName, userName, dateOfBirth, position, nationalID, phoneNumber,
                howManyDaysFrom81And47, normalLeavesCount, normalLeavesCount_47, normalLeavesCount_81Before1Years,
                normalLeavesCount_81Before2Years, normalLeavesCount_81Before3Years, nonChronicSickLeavesCount,
                governorate, state, street, disability, email, hireDate, casualLeavesCount, departement_ID, gender, password };
        
            fetch(`http://agazatyapi.runasp.net/api/Account/CreateUser/${role}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEmployee)
            })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    title: `<span style='color:#0d6efd;'>تمت إضافة الموظف بنجاح.</span>`,
                    icon: "success",
                    confirmButtonText: "مشاهدة الموظفين",
                    confirmButtonColor: "#0d6efd",
                    }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "http://localhost:3000/employees";
                    }
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: `<span style='color:red;'>خطأ في الإضافة</span>`,
                    text: "حدث خطأ أثناء حفظ البيانات. حاول مرة أخرى.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            });
    };
    

    return(
        <div>
            <div className="zzz d-inline-block p-3 ps-5">
                <h2 className="m-0">تعديل بيانات {}</h2>
            </div>
            <form onSubmit={handleData}>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleInputDeputy1" className="form-label">الشخص ذو إعاقة</label>
                        <select
                            className="form-select"
                            id="exampleInputDeputy1"
                            aria-label="Default select example"
                            onChange={(e) => setDisability(JSON.parse(e.target.value))}
                        >
                            <option value="false">لا</option>
                            <option value="true">نعم</option>
                        </select>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleInputDeputy4" className="form-label">المنصب</label>
                        <select
                            className="form-select"
                            id="exampleInputDeputy4"
                            aria-label="Default select example"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">اختر دورًا</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlText1" className="form-label">الاسم الأول</label>
                        <input className="form-control" type="text" onChange={(e)=> setFirstName(e.target.value)} placeholder="يحيى" id="exampleFormControlText1" aria-label="default input example" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlText2" className="form-label">الاسم الثاني</label>
                        <input className="form-control" type="text" onChange={(e)=> setSecondName(e.target.value)} defaultValue={secondName} id="exampleFormControlText2" aria-label="default input example" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlText3" className="form-label">الاسم الثالث</label>
                        <input className="form-control" type="text" onChange={(e)=> setThirdName(e.target.value)} placeholder="عبدالموجود" id="exampleFormControlText3" aria-label="default input example" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlText4" className="form-label">الاسم الرابع</label>
                        <input className="form-control" type="text" onChange={(e)=> setForthName(e.target.value)} placeholder="جادالرب" id="exampleFormControlText4" aria-label="default input example" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlText0" className="form-label">اسم المستخدم</label>
                        <input className="form-control" type="text" onChange={(e)=> setUserName(e.target.value)} placeholder="yahyasaad" id="exampleFormControlText0" aria-label="default input example" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber1" className="form-label">الرقم القومي</label>
                        <input className="form-control" type="number" onChange={(e)=> setNationalID(e.target.value)} placeholder="30201241201212" id="exampleFormControlNumber1" aria-label="default input example" dir="rtl" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber2" className="form-label">رقم الهاتف</label>
                        <input className="form-control" type="number" onChange={(e)=> setPhoneNumber(e.target.value)} placeholder="01127471188" id="exampleFormControlNumber2" aria-label="default input example" dir="rtl" />
                    </div>

                    {disability === false && monthsOfWork >= 6 && yearsOfWork < 12 && yearsOfWork < 1 && age <= 50 ?
                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber3" className="form-label">عدد الاجازات الاعتيادية</label>
                        <input max={15} className="form-control" type="number" onChange={(e)=> setNormalLeavesCount(e.target.value)} placeholder="15" id="exampleFormControlNumber5" aria-label="default input example" dir="rtl" />
                    </div>
                    :  disability === false && yearsOfWork >= 1 && yearsOfWork < 10 && age <= 50 ?
                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber3" className="form-label">عدد الاجازات الاعتيادية</label>
                        <input max={36} className="form-control" type="number" onChange={(e)=> setNormalLeavesCount(e.target.value)} placeholder="36" id="exampleFormControlNumber5" aria-label="default input example" dir="rtl" />
                    </div>
                    :   disability === false && yearsOfWork >= 10 && age <= 50 ?
                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber3" className="form-label">عدد الاجازات الاعتيادية</label>
                        <input max={45} className="form-control" type="number" onChange={(e)=> setNormalLeavesCount(e.target.value)} placeholder="45" id="exampleFormControlNumber5" aria-label="default input example" dir="rtl" />
                    </div>
                    : age >= 50 ?
                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber3" className="form-label">عدد الاجازات الاعتيادية</label>
                        <input max={60} className="form-control" type="number" onChange={(e)=> setNormalLeavesCount(e.target.value)} placeholder="60" id="exampleFormControlNumber5" aria-label="default input example" dir="rtl" />
                    </div>
                    :   disability === true ?
                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber3" className="form-label">عدد الاجازات الاعتيادية</label>
                        <input max={60} className="form-control" type="number" onChange={(e)=> setNormalLeavesCount(e.target.value)} placeholder="60" id="exampleFormControlNumber5" aria-label="default input example" dir="rtl" />
                    </div>
                    :   null
                    }

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber5" className="form-label">عدد الاجازات الاعتيادية_47</label>
                        <input className="form-control" type="number" onChange={(e)=> setNormalLeavesCount_47(e.target.value)} placeholder="11" id="exampleFormControlNumber3" aria-label="default input example" dir="rtl" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber4" className="form-label">عدد أيام المأخوذة من47 و 81</label>
                        <input className="form-control" type="number" onChange={(e)=> setHowManyDaysFrom81And47(e.target.value)} placeholder="11" id="exampleFormControlNumber4" aria-label="default input example" dir="rtl" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber6" className="form-label">عدد الاجازات الاعتيادية_81 قبل سنة</label>
                        <input className="form-control" type="number" onChange={(e)=> setNormalLeavesCount_81Before1Years(e.target.value)} placeholder="11" id="exampleFormControlNumber6" aria-label="default input example" dir="rtl" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber7" className="form-label">عدد الاجازات الاعتيادية_81 قبل سنتين</label>
                        <input className="form-control" type="number" onChange={(e)=> setNormalLeavesCount_81Before2Years(e.target.value)} placeholder="11" id="exampleFormControlNumber7" aria-label="default input example" dir="rtl" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber8" className="form-label">عدد الاجازات الاعتيادية_81 قبل 3 سنوات</label>
                        <input className="form-control" type="number" onChange={(e)=> setNormalLeavesCount_81Before3Years(e.target.value)} placeholder="11" id="exampleFormControlNumber8" aria-label="default input example" dir="rtl" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber12" className="form-label">عدد الاجازات العارضة</label>
                        <input className="form-control" type="number" onChange={(e)=> setCasualLeavesCount(e.target.value)} placeholder="7" id="exampleFormControlNumber12" aria-label="default input example" dir="rtl" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber9" className="form-label">عدد الاجازات المرضية</label>
                        <input className="form-control" type="number" onChange={(e)=> setnonChronicSickLeavesCount(e.target.value)} placeholder="11" id="exampleFormControlNumber9" aria-label="default input example" dir="rtl" />
                    </div>

                    {/* <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber10" className="form-label">سنوات العمل</label>
                        <input className="form-control" type="number" onChange={(e)=> SetYearsOfWork(e.target.value)} placeholder="11" id="exampleFormControlNumber10" aria-label="default input example" dir="rtl" />
                    </div> */}

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlNumber11" className="form-label">المنصب</label>
                        <select className="form-select" name="" onChange={(e)=> setPosition(e.target.value)} placeholder="2" id="exampleFormControlNumber11" aria-label="default input example" dir="rtl" >
                            <option value="">اختر المنصب</option>
                            <option value={2}>دكتور</option>
                            <option value={1}>معيد / موظف</option>
                        </select>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlText5" className="form-label">المحافظة</label>
                        <input className="form-control" type="text" onChange={(e)=> setGovernorate(e.target.value)} placeholder="قنا" id="exampleFormControlText5" aria-label="default input example" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlText6" className="form-label">المركز / المدينة</label>
                        <input placeholder='قوص' type="text" className="form-control" name="state" onChange={handleChange} id="state" defaultValue={user.state ?? user.state} />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleFormControlText7" className="form-label">القرية / الشارع</label>
                        <input className="form-control" type="text" onChange={(e)=> setStreet(e.target.value)} placeholder="طريق الشوادر بجوار قاعة شهرزاد" id="exampleFormControlText7" aria-label="default input example" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">البريد الإلكتروني</label>
                        <input className="form-control" type="email" onChange={(e)=> setEmail(e.target.value)} placeholder="yahyasaad2024@gmail.com" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleInputDate2" className="form-label">تاريخ التعيين</label>
                        <input type="date" onChange={(e)=> setHireDate(e.target.value)} className="form-control" id="exampleInputDate2" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleInputDate3" className="form-label">تاريخ الميلاد</label>
                        <input type="date" onChange={(e)=> setDateOfBirth(e.target.value)} className="form-control" id="exampleInputDate3" />
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleInputDeputy1" className="form-label">القسم</label>
                        <select
                            className="form-select"
                            id="exampleInputDeputy1"
                            aria-label="Default select example"
                            onChange={(e)=> setDepartement_ID(e.target.value)}
                        >
                            <option value="">اختر القسم</option>
                                {departments.map((department, index) => (
                                    <option key={index} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleInputDeputy3" className="form-label">الجنس</label>
                        <select
                            className="form-select"
                            id="exampleInputDeputy3"
                            aria-label="Default select example"
                            onChange={(e)=> setGender(e.target.value)}
                        >
                                <option value="">اختر الجنس</option>
                                <option value='ذكر'>ذكر</option>
                                <option value='أنثى'>أنثى</option>
                        </select>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">كلمة المرور</label>
                        <input type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} placeholder="********" id="exampleInputPassword1" />
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <Btn name='إضافة' link='/' class='btn-primary w-50' />
                </div>
            </form>
        </div>
    )
}

export default EditEmployeeForHR;
