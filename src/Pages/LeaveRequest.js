import Leave from "../components/Leave";

function LeaveRequest() {
    return (
        <div className="p-3">
                {/* متنساش إنك تعرض الاجازات المتبقية في كل نوع اجازة لما الموظف يحدد نوع الاجازة بتاعته  */}
            <Leave titleName= 'طلب اجازة' />
        </div>
    );
}

export default LeaveRequest;
