import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import Modal from 'react-modal';
import API from "../Data";

// تحديد مكان عرض النافذة المنبثقة
Modal.setAppElement('#root');  // تأكد من أنك حددت هذا العنصر

function PermitLeave() {
    const { permitID } = useParams();
    const [permitLeave, setPermitLeave] = useState(null);
    const [user, setUser] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchPermitLeave = async () => {
            try {
                const res = await fetch(`http://agazatyapi.runasp.net/api/PermitLeave/GetPermitLeaveById/${permitID}`);
                const data = await res.json();
                setPermitLeave(data);
            } catch (err) {
                console.error("Error fetching leave data:", err);
            }
        };

        fetchPermitLeave();
    }, [permitID]);

    useEffect(() => {
        const fetchUserAndImage = async () => {
            if (!permitLeave?.userId) return;

            try {
                const [userRes, imageRes] = await Promise.all([
                    fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${permitLeave.userId}`),
                    fetch(`http://agazatyapi.runasp.net/api/PermitLeave/GetPermitLeaveImageByLeaveId/${permitID}`)
                ]);

                const userData = await userRes.json();
                const imageData = await imageRes.json();

                setUser(userData);
                setImageUrl(imageData.imageUrl);
            } catch (err) {
                console.error("Error fetching user or image:", err);
            }
        };

        fetchUserAndImage();
    }, [permitLeave, permitID]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">{`التصريح رقم #${permitID}`}</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='سجل التصاريح' link='/des-requests/permit' class="btn btn-primary m-0 ms-2 mb-2"/>
                </div>
            </div>

            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-sm-12 col-lg-10 col-xl-8">
                    <div className="card d-flex flex-row p-3 align-items-stretch" style={{ direction: 'rtl' }}>

                        <table className="table table-striped m-0 w-100">
                            <tbody>
                                <tr>
                                    <th scope="col">اسم الموظف</th>
                                    <th scope="col" className="text-start">
                                        {permitLeave ? permitLeave.userName : "جاري التحميل..."}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col">رقم الهاتف</th>
                                    <th scope="col" className="text-start">
                                        {user ? user.phoneNumber : "جاري التحميل..."}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col">القسم</th>
                                    <th scope="col" className="text-start">
                                        {user ? user.departmentName : "جاري التحميل..."}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col">التاريخ</th>
                                    <th scope="col" className="text-start">
                                        {permitLeave ? new Date(permitLeave.date).toLocaleDateString() : "جاري التحميل..."}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col">عدد ساعات التصريح</th>
                                    <th scope="col" className="text-start">
                                        {permitLeave ? permitLeave.hours : "جاري التحميل..."}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col">المرجع</th>
                                    <th scope="col" className="text-start">
                                        #{permitLeave ? permitLeave.id : "جاري التحميل..."}
                                    </th>
                                </tr>
                            </tbody>
                        </table>

                        <img
                            src={`http://agazatyapi.runasp.net${imageUrl}`}
                            alt="صورة التصريح"
                            className="rounded-start w-75 w-sm-25 w-md-50 w-lg-75"
                            style={{ cursor: 'pointer' }}
                            onClick={openModal} // عند النقر على الصورة
                        />

                        {/* Modal لعرض الصورة */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="صورة التصريح"
                            className="modal-content"
                            overlayClassName="modal-overlay"
                            shouldCloseOnOverlayClick={true} // يمكنك إغلاقها عند النقر خارج الصورة
                        >
                            <button onClick={closeModal} className="btn-close">إغلاق</button>
                            <img
                                src={`http://agazatyapi.runasp.net${imageUrl}`}
                                alt="صورة التصريح"
                                className="modal-image"
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PermitLeave;
