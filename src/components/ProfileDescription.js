import { roleName } from "../server/serves";

function ProfileDescription({userData}){
    const hireYear = new Date(userData.hireDate).getFullYear();
    const date = new Date().getFullYear();

    const toArabicNumbers = (number) => (number !== undefined && number !== null) ? number.toString().replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit]) : '--';

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
                        <th className="text-start">{userData.fullName}</th>
                    </tr>
                    <tr>
                        <th>المسمى الوظيفي</th>
                        <th className="text-start">{roleName}</th>
                    </tr>
                    <tr>
                        <th>القسم</th>
                        <th className="text-start">{userData.departmentName || <apan className='text-danger'>لم يُحدد بعد</apan>}</th>
                    </tr>
                    <tr>
                        <th>تاريخ التعيين</th>
                        <th className="text-start">{new Date(userData.hireDate).toLocaleDateString('ar-EG')}</th>
                    </tr>
                    <tr>
                        <th>البريد الإلكتروني</th>
                        <th className="text-start">{userData.email}</th>
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
                        <th className="text-start">{toArabicNumbers(userData.normalLeavesCount)}</th>
                    </tr>
                    {hireYear <= 2015 &&
                        <tr>
                            <th>رصيد اجازات ما قبل سنة ٢٠١٥</th>
                            <th className="text-start">{toArabicNumbers(userData.normalLeavesCount_47)}</th>
                        </tr>}
                    <tr>
                        <th>رصيد الاجازات الاعتيادية سنة {toArabicNumbers(date - 1)}</th>
                        <th className="text-start">{toArabicNumbers(userData.normalLeavesCount_81Before1Years)}</th>
                    </tr>
                    <tr>
                        <th>رصيد الاجازات الاعتيادية سنة {toArabicNumbers(date - 2)}</th>
                        <th className="text-start">{toArabicNumbers(userData.normalLeavesCount_81Before2Years)}</th>
                    </tr>
                    <tr>
                        <th>رصيد الاجازات الاعتيادية سنة {toArabicNumbers(date - 3)}</th>
                        <th className="text-start">{toArabicNumbers(userData.normalLeavesCount_81Before3Years)}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProfileDescription;