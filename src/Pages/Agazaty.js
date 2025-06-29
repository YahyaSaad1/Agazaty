import YahyaSaad from "../Images/YahyaSaad.jpg";
import Abdohamdy from "../Images/Abdohamdy.jpg";
import Omar from "../Images/Omar.jpg";
import Ashraf from "../Images/Ashraf.jpg";
import ElHawary from "../Images/ElHawary.jpg";
import Ahmed from "../Images/Ahmed.jpg";
import AbdElQadir from "../Images/AbdElQadir.jpg";
import Hesham from "../Images/Hesham.jpg";
import Magdy from "../Images/Magdy.jpg";
import facebook from "../Images/facebook.png";
import linkeIn from "../Images/linkeIn.png";
import gmail from "../Images/gmail.png";
import { Link } from "react-router-dom";
import NavTeam from "../components/NavTeam";

function Agazaty() {
    const team = [
        {id: 1, image: YahyaSaad, type: "Front End Developer", fullName: "يحيى سعد عبدالموجود", socialMedia: {linkedIn: "yahyasaad1", facebook: "yahyasaad24" ,email: "yahyasaad2024@gmail.com"}},
        {id: 2, image: Abdohamdy, type: "Back End Developer", fullName: "عبدالرحمن حمدي توفيق", socialMedia: {linkedIn: "abdelrhman-hamdy-tawfic-5b56b2282", facebook: "abdelrhman.hamdy.154050" ,email: "abdo7amdy123@gmail.com"}},
        {id: 3, image: Omar, type: "Back End Developer", fullName: "عمر حمدي سيد", socialMedia: {linkedIn: "yahyasaad1", facebook: "yahyasaad24" ,email: "yahyasaad2024@gmail.com"}},
        {id: 4, image: Ashraf, type: "Back End Developer", fullName: "أشرف أبوالري عطية", socialMedia: {linkedIn: "ashraf-abu-elrai", facebook: "ashraf.abuelray.5" ,email: "ashrafabuelrayattiah@gmail.com"}},
        {id: 5, image: ElHawary, type: "Front End Developer", fullName: "محمود نصرالدين حافظ", socialMedia: {linkedIn: "mahmoud-nasr-821582229", facebook: "mahmoud.nasr.876051",email: "alhawary11178@gmail.com"}},
        {id: 6, image: Ahmed, type: "Front End Developer", fullName: "احمد يسن خضري ", socialMedia: {linkedIn: "ahmed-yassen-674840315", facebook: "ahmed.yassen.5220665",email: "ay7522921@gmail.com"}},
        {id: 7, image: AbdElQadir, type: "UI&UX", fullName: " عبدالرحمن احمد علي ", socialMedia: {linkedIn: "abdelrahman-abd-elkader", facebook: "abdelrahman.abdelkader.990403" ,email: "abdoahmed7433@gmail.com"}},
        {id: 8, image: Hesham, type: "Back End Developer", fullName: "هشام مسعد احمد", socialMedia: {linkedIn: "yahyasaad1", facebook: "yahyasaad24" ,email: "yahyasaad2024@gmail.com"}},
    ];

    return (
        <div>
            <NavTeam />
            <div className="p-3 pt-5" style={{ backgroundColor: "#F0F0F0" }}>
                <div className="mt-5">
                    <h2 className="Agazaty-title text-center pt-2">نبذة عن فريق عمل مشروع اجازاتي</h2>
                </div>
                <div className="mt-5 bbbb box-team p-2">
                    <ul>
                        <li>نحن فريق عمل المشروع، نتكون من ثمانية اشخاص .</li>
                        <li>التحقنا بكلية الحاسبات والمعلومات جامعة جنوب الوادي بقنا عام 2021.</li>
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
                            {team.map((member, index)=>{
                                return(
                                    <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                                        <div className="pic">
                                            <img src={member.image} alt="teamImg" />
                                        </div>
                                        <div className="desc text-center">
                                            <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                                                <div>
                                                    <h4 className="text-bold">{member.fullName}</h4>
                                                    <p className="mb-2">{member.type}</p>
                                                </div>
                                                    <div className="d-flex justify-content-center align-items-center social" style={{ gap: "8px" }}>
                                                        <Link className="p-1 d-flex justify-content-center align-items-center" to={`mailto:${member.socialMedia.email}`} target="_blank" rel="noopener noreferrer">
                                                            <img src={gmail} alt="Gmail" />
                                                        </Link>

                                                        <Link className="p-1 d-flex justify-content-center align-items-center" to={`https://www.linkedin.com/in/${member.socialMedia.linkedIn}`} target="_blank" rel="noopener noreferrer">
                                                            <img src={linkeIn} alt="LinkedIn" />
                                                        </Link>

                                                        <Link className="p-1 d-flex justify-content-center align-items-center" to={`https://www.facebook.com/${member.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
                                                            <img src={facebook} alt="Facebook" />
                                                        </Link>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>


                    <div className="mt-4">
                        <h2 className="bbb text-center">شكر خاص</h2>
                    </div>

                    <div className="mt-3 bg-light p-3">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                                <div className="pic">
                                    <img src={Magdy} alt="teamImg" />
                                </div>
                                <div className="desc text-center">
                                    <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                                        <div>
                                            <h4 className="text-bold">{'مجدي قدوس'}</h4>
                                            <p className="mb-2">{'مدير قسم الموارد البشرية'}</p>
                                        </div>
                                            <div className="d-flex justify-content-center align-items-center social" style={{ gap: "8px" }}>
                                                <Link className="p-1 d-flex justify-content-center align-items-center" to={`mailto:magdykodous588@gmail.com`} target="_blank" rel="noopener noreferrer">
                                                    <img src={gmail} alt="Gmail" />
                                                </Link>

                                                <Link className="p-1 d-flex justify-content-center align-items-center" to={`https://www.linkedin.com/in/yahyasaad1`} target="_blank" rel="noopener noreferrer">
                                                    <img src={linkeIn} alt="LinkedIn" />
                                                </Link>

                                                <Link className="p-1 d-flex justify-content-center align-items-center" to={`https://www.facebook.com/magdy.kodous.2025`} target="_blank" rel="noopener noreferrer">
                                                    <img src={facebook} alt="Facebook" />
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

export default Agazaty;