import API from "../Data" ;

function ProfileDescription({user}){
    const hireDate = user.hireDate;
    const hireYear = new Date(hireDate).getFullYear();
    const date = new Date().getFullYear();

    return(
        <div>
            <table className="m-0 table table-striped" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', overflow: 'hidden'}}>
                <thead>
                    <tr>
                        <th colSpan={2} className="text-primary fw-bold" style={{backgroundColor:'#F5F9FF'}}>معلومات المستخدم</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>الاسم</th>
                        <th className="text-start">{user.fullName}</th>
                    </tr>
                    <tr>
                        <th>المسمى الوظيفي</th>
                        <th className="text-start">{user.roleName}</th>
                    </tr>
                    <tr>
                        <th>القسم</th>
                        <th className="text-start">{user.departmentName}</th>
                    </tr>
                    <tr>
                        <th>تاريخ التعيين</th>
                        <th className="text-start">{new Date(user.hireDate).toLocaleDateString()}</th>
                    </tr>
                    <tr>
                        <th>البريد الإلكتروني</th>
                        <th className="text-start">{user.email}</th>
                    </tr>
                </tbody>
            </table>

            <table className="m-0 mt-5 table table-striped" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', overflow: 'hidden'}}>
                <thead>
                    <tr>
                        <th colSpan={2} className="text-primary fw-bold" style={{backgroundColor:'#F5F9FF'}}>تفاصيل الاجازات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>رصيد الاجازات الاعتيادية السنوية</th>
                        <th className="text-start">{user.normalLeavesCount}</th>
                    </tr>
                    {hireYear <= 2015 &&
                        <tr>
                            <th>رصيد اجازات ما قبل سنة 2015</th>
                            <th className="text-start">{user.normalLeavesCount_47}</th>
                        </tr>}
                    <tr>
                        <th>رصيد الاجازات الاعتيادية سنة {date - 1}</th>
                        <th className="text-start">{user.normalLeavesCount_81Before1Years}</th>
                    </tr>
                    <tr>
                        <th>رصيد الاجازات الاعتيادية سنة {date - 2}</th>
                        <th className="text-start">{user.normalLeavesCount_81Before2Years}</th>
                    </tr>
                    <tr>
                        <th>رصيد الاجازات الاعتيادية سنة {date - 3}</th>
                        <th className="text-start">{user.normalLeavesCount_81Before3Years}</th>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default ProfileDescription;