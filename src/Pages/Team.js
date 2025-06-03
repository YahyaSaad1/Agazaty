import YahyaSaad from "../Images/YahyaSaad.jpg";
import Abdohamdy from "../Images/Abdohamdy.jpg";
import ElHawary from "../Images/ElHawary.jpg";
import Ahmed from "../Images/Ahmed.jpg";
import AbdElQadir from "../Images/AbdElQadir.jpg";
import Hesham from "../Images/Hesham.jpg";
import Ashraf from "../Images/Ashraf.jpg";
import Omar from "../Images/Ashraf.jpg";
import { Link } from "react-router-dom";
import NavTeam from "../components/NavTeam";

function Team() {
    return (
        <div>
        <NavTeam />
        <div className="p-3 pt-5" style={{ backgroundColor: "#F0F0F0" }}>
            <div className="mt-5">
                <h2 style={{ paddingTop: "10px" }} className="bbb text-center">نبذة عن فريق عمل مشروع اجازاتي</h2>
            </div>
            <div className="mt-5 bbbb box-team p-2">
            <ul>
                <li>نحن فريق عمل المشروع، نتكون من ثمانية اشخاص .</li>
                <li>
                التحقنا بكلية الحاسبات والمعلومات جامعة جنوب الوادي بقنا عام 2021
                .
                </li>
                <li>من القسمين علوم الحاسب وتكنولوجيا المعلومات .</li>
                <li>وكان لكل منّا دوره فى المشروع ونجاحه .</li>
            </ul>
            </div>

            <div className="mt-5 p-4" style={{ backgroundColor: "#D6D6D6" }}>
            <div>
                <h2 className="bbb text-center">فريق عمل المشروع</h2>
            </div>
            <div className="mt-3 bg-light p-3">
                <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <div className="pic">
                    <img src={YahyaSaad} alt="teamImg" />
                    </div>
                    <div className="desc text-center">
                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                        <div>
                        <h4 className="text-bold">يحيى سعد عبدالموجود</h4>
                        <p style={{ paddingTop: "8px" }}>Front End Developer</p>
                        </div>
                        <div className="d-flex social" style={{ gap: "3px" }}>
                        <Link
                            className="p-1"
                            to="mailto:yahyasaad2024@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                            alt="Gmail"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.linkedin.com/in/yahyasaad1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.facebook.com/yahyasaad24"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <div className="pic">
                    <img src={Abdohamdy} alt="teamImg" />
                    </div>
                    <div className="desc text-center">
                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                        <div>
                        <h4 className="text-bold">عبدالرحمن حمدي توفيق</h4>
                        <p style={{ paddingTop: "8px" }}>Back End Developer</p>
                        </div>
                        <div className="d-flex social" style={{ gap: "3px" }}>
                        <Link
                            className="p-1"
                            to="mailto:abdo7amdy@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                            alt="Gmail"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to={`https://www.linkedin.com/in/abdelrhman-hamdy-tawfic-5b56b2282`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.facebook.com/abdelrhman.hamdy.154050"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <div className="pic">
                    <img src={ElHawary} alt="teamImg" />
                    </div>
                    <div className="desc text-center">
                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                        <div>
                        <h4 className="text-bold">محمود نصرالدين حافظ</h4>
                        <p style={{ paddingTop: "8px" }}>Front End Developer</p>
                        </div>

                        <div className="d-flex social" style={{ gap: "3px" }}>
                        <Link
                            className="p-1"
                            to="mailto:Mahmoudnasr11178@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                            alt="Gmail"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to={`https://www.linkedin.com/in/mahmoud-nasr-821582229?`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.facebook.com/profile.php?id=100011187313104"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <div className="pic">
                    <img src={Ahmed} alt="teamImg" />
                    </div>
                    <div className="desc text-center">
                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                        <div>
                        <h4 className="text-bold">احمد يسن خضري محمود</h4>
                        <p style={{ paddingTop: "8px" }}>Front End Developer</p>
                        </div>

                        <div className="d-flex social" style={{ gap: "3px" }}>
                        <Link
                            className="p-1"
                            to="mailto:ay7522921@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                            alt="Gmail"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to={`https://www.linkedin.com/in/ahmed-yassen-674840315`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.facebook.com/ahmed.yassen.5220665"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <div className="pic">
                    <img src={Ashraf} alt="teamImg" />
                    </div>
                    <div className="desc text-center">
                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                        <div>
                        <h4 className="text-bold">أشرف أبوالري عطية</h4>
                        <p style={{ paddingTop: "8px" }}>Back End Developer</p>
                        </div>
                        <div className="d-flex social" style={{ gap: "3px" }}>
                        <Link
                            className="p-1"
                            to="mailto:ay7522921@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                            alt="Gmail"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to={`https://www.linkedin.com/in/ahmed-yassen-674840315`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.facebook.com/ashraf.abuelray.5"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <div className="pic">
                    <img src={Omar} alt="teamImg" />
                    </div>
                    <div className="desc text-center">
                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                        <div>
                        <h4 className="text-bold">عمر حمدي سيد</h4>
                        <p style={{ paddingTop: "8px" }}>Back End Developer</p>
                        </div>
                        <div className="d-flex social" style={{ gap: "3px" }}>
                        <Link
                            className="p-1"
                            to="mailto:ay7522921@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                            alt="Gmail"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to={`https://www.linkedin.com/in/ahmed-yassen-674840315`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.facebook.com/omar.hamdy.560272/friends_mutual"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <div className="pic">
                    <img src={AbdElQadir} alt="teamImg" />
                    </div>
                    <div className="desc text-center">
                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                        <div>
                        <h4 className="text-bold">عبدالرحمن احمد علي</h4>
                        <p style={{ paddingTop: "8px" }}>UI&UX</p>
                        </div>
                        <div className="d-flex social" style={{ gap: "3px" }}>
                        <Link
                            className="p-1"
                            to="mailto:ay7522921@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                            alt="Gmail"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to={`https://www.linkedin.com/in/ahmed-yassen-674840315`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.facebook.com/abdelrahman.abdelkader.990403"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <div className="pic">
                    <img src={Hesham} alt="teamImg" />
                    </div>
                    <div className="desc text-center">
                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                        <div>
                        <h4 className="text-bold">هشام مسعد احمد</h4>
                        <p style={{ paddingTop: "8px" }}>Back End Developer</p>
                        </div>
                        <div className="d-flex social" style={{ gap: "3px" }}>
                        <Link
                            className="p-1"
                            to="mailto:ay7522921@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                            alt="Gmail"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to={`https://www.linkedin.com/in/ahmed-yassen-674840315`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            />
                        </Link>

                        <Link
                            className="p-1"
                            to="https://www.facebook.com/hesham.mosaad.54"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                            style={{ width: "36px", padding: "5px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Team;
