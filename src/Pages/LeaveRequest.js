import Leave from "../components/Leave";

function LeaveRequest() {
    return (
        <div className="p-3">
                {/* متنساش إنك تعرض الإجازات المتبقية في كل نوع إجازة لما الموظف يحدد نوع الإجازة بتاعته  */}
            <Leave titleName= 'طلب إجازة' />
        </div>
    );
}

export default LeaveRequest;
