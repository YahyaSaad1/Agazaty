import BtnLink from "./BtnLink";

function SittingCom(){

    return(
        <div className="row">
            <div>
                <div className="box d-flex justify-content-between mt-3 col-sm-12 col-md-10 col-lg-8">
                    <h5 className="d-flex align-items-center">تعديل الملف الشخصي</h5>
                    <BtnLink name='تعديل' link='/editprofile' class='btn-outline-primary' />
                </div>
                <div className="box d-flex justify-content-between mt-3 col-sm-12 col-md-10 col-lg-8">
                    <h5 className="m-0 d-flex align-items-center">اعدادات الاشعارات</h5>
                    <BtnLink name='تعديل' link='/profile' class='btn-outline-primary' />
                </div>
                <div className="box d-flex justify-content-between mt-3 col-sm-12 col-md-10 col-lg-8">
                    <h5 className="m-0 d-flex align-items-center">اعدادات اللغة والواجهة</h5>
                    <BtnLink name='تعديل' link='/profile' class='btn-outline-primary' />
                </div>
                <div className="box d-flex justify-content-between mt-3 col-sm-12 col-md-10 col-lg-8">
                    <h5 className="m-0 d-flex align-items-center">اعدادات الاجازات</h5>
                    <BtnLink name='تعديل' link='/profile' class='btn-outline-primary' />
                </div>
            </div>
        </div>
    )
}

export default SittingCom;