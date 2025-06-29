import { useParams } from "react-router-dom";
import "../CSS/LeaveRequests.css";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { BASE_API_URL, token } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PermitReport from "../components/PermitReport";

Modal.setAppElement("#root");

function PermitLeave() {
  const { permitID } = useParams();
  const [permitLeave, setPermitLeave] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchPermitLeave = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/PermitLeave/GetPermitLeaveById/${permitID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setPermitLeave(data);
      } catch (err) {
        console.error("Error fetching leave data:", err);
      }
    };

    fetchPermitLeave();
  }, [permitID]);

  useEffect(() => {
    const fetchPermitLeaveImage = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/PermitLeave/GetPermitLeaveImageByLeaveId/${permitID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setImageUrl(data.imageUrl);
      } catch (err) {
        console.error("Error fetching leave image:", err);
      }
    };
    fetchPermitLeaveImage();
  }, [permitID]);

  useEffect(() => {
    if (!permitLeave) return;

    fetch(`${BASE_API_URL}/api/Account/GetUserById/${permitLeave.userID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [permitLeave]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  if (permitLeave === null || user === null) {
    return <LoadingOrError data={permitLeave} />;
  }

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0">{`تصريح ${permitLeave.firstName} ${permitLeave.secondName}`}</h2>
        </div>
        <div className="p-3 pe-0">
          <button
              className="btn btn-outline-primary"
              onClick={() =>
                  MySwal.fire({
                  title: 'تقرير التصريح',
                  html: <PermitReport permitID={permitID} />,
                  showConfirmButton: false,
                  showCloseButton: true,
                  width: '95%',
                  customClass: {
                  popup: 'text-end custom-swal-width',
                  }})}>
              <FontAwesomeIcon icon={faPrint} />
              <span className="d-none d-sm-inline"> طباعة</span>
          </button>
        </div>
      </div>
      <div className="row mt-5 d-flex justify-content-center">
        <div
          className="col-sm-12 col-lg-10 col-xl-8 box table-responsive"
        >
          <div
            className="d-flex flex-row p-2 align-items-stretch "
            style={{ direction: "rtl" }}
          >
            <table className="table table-striped m-0 w-100">
              <tbody>
                <tr>
                  <th scope="col">اسم الموظف</th>
                  <th scope="col" className="text-start">
                    {permitLeave.userName}
                  </th>
                </tr>
                <tr>
                  <th scope="col">رقم الهاتف</th>
                  <th scope="col" className="text-start">
                    {user.phoneNumber.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}
                  </th>
                </tr>
                <tr>
                  <th scope="col">القسم</th>
                  <th scope="col" className="text-start">{user.departmentName ? (user.departmentName) : (<span className="text-danger">إدارة مستقلة</span>)}</th>
                </tr>
                <tr>
                  <th scope="col">التاريخ</th>
                  <th scope="col" className="text-start">
                    {new Date(permitLeave.date).toLocaleDateString("ar-EG")}
                  </th>
                </tr>
                <tr>
                  <th scope="col">عدد ساعات التصريح</th>
                  <th scope="col" className="text-start">
                    {permitLeave.hours
                      .toString()
                      .replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[digit])}
                  </th>
                </tr>
              </tbody>
            </table>

            <img
              src={`${BASE_API_URL}${imageUrl}`}
              alt="صورة التصريح"
              className="rounded-start w-75 w-sm-25 w-md-50 w-lg-75"
              style={{ cursor: "pointer" }}
              onClick={openModal}
            />

            {/* Modal لعرض الصورة */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="صورة التصريح"
              className="modal-content"
              overlayClassName="modal-overlay"
              shouldCloseOnOverlayClick={true}
            >
              <button onClick={closeModal} className="btn-close">
                إغلاق
              </button>
              <img
                src={`${BASE_API_URL}${imageUrl}`}
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