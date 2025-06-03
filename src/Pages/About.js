import { Link } from "react-router-dom";
import "../CSS/About.css";
import YahyaSaad from "../Images/YahyaSaad.jpg";
import Abdohamdy from "../Images/Abdohamdy.jpg";
import ElHawary from "../Images/ElHawary.jpg";
import AbdElQadir from "../Images/AbdElQadir.jpg";
import Ashraf from "../Images/Ashraf.jpg";
import Hesham from "../Images/Hesham.jpg";
import Ahmed from "../Images/Ahmed.jpg";
import user from "../Images/download.jpeg";

function About() {
  const team = [
    {
      id: 1,
      image: YahyaSaad,
      type: "FrontEnd",
      department: "علوم الحاسب",
      firstName: "يحيى",
      secondName: "سعد",
      thirdName: "عبدالموجود",
      fourthName: "جادالرب",
      socialMedia: {
        linkedIn: "yahyasaad1",
        gitHub: "yahyasaad1",
        whatsapp: "010027471188",
        email: "yahyasaad2024@gmail.com",
      },
    },
    {
      id: 1,
      image: Abdohamdy,
      type: "BackEnd",
      department: "علوم الحاسب",
      firstName: "عبدالرحمن",
      secondName: "حمدي",
      thirdName: "توفيق",
      fourthName: "شعبان",
      socialMedia: {
        linkedIn: "yahyasaad1",
        gitHub: "yahyasaad1",
        whatsapp: "01015652527",
        email: "yahyasaad2024@gmail.com",
      },
    },
    {
      id: 1,
      image: ElHawary,
      type: "FrontEnd",
      department: "علوم الحاسب",
      firstName: "محمود",
      secondName: "نصر الدين",
      thirdName: "حافظ",
      fourthName: "محمود",
      socialMedia: {
        linkedIn: "yahyasaad1",
        gitHub: "yahyasaad1",
        whatsapp: "010027471188",
        email: "yahyasaad2024@gmail.com",
      },
    },
    {
      id: 1,
      image: Ashraf,
      type: "BackEnd",
      department: "علوم الحاسب",
      firstName: "أشرف",
      secondName: "أبوالري",
      thirdName: "عطية",
      fourthName: "محمود",
      socialMedia: {
        linkedIn: "yahyasaad1",
        gitHub: "yahyasaad1",
        whatsapp: "010027471188",
        email: "yahyasaad2024@gmail.com",
      },
    },
    {
      id: 1,
      image: user,
      type: "BackEnd",
      department: "علوم الحاسب",
      firstName: "عمر",
      secondName: "حمدي",
      thirdName: "سيد",
      fourthName: "عبدالقادر",
      socialMedia: {
        linkedIn: "yahyasaad1",
        gitHub: "yahyasaad1",
        whatsapp: "01021514586",
        email: "yahyasaad2024@gmail.com",
      },
    },
    {
      id: 1,
      image: AbdElQadir,
      type: "UI&UX",
      department: "تكنولوجيا المعلومات",
      firstName: "عبدالرحمن",
      secondName: "احمد",
      thirdName: "علي",
      fourthName: "عبدالقادر",
      socialMedia: {
        linkedIn: "yahyasaad1",
        gitHub: "yahyasaad1",
        whatsapp: "01030492160",
        email: "yahyasaad2024@gmail.com",
      },
    },
    {
      id: 1,
      image: Hesham,
      type: "BackEnd",
      department: "علوم الحاسب",
      firstName: "هشام",
      secondName: "مسعد",
      thirdName: "احمد",
      fourthName: "حسين",
      socialMedia: {
        linkedIn: "yahyasaad1",
        gitHub: "yahyasaad1",
        whatsapp: "010027471188",
        email: "yahyasaad2024@gmail.com",
      },
    },
    {
      id: 1,
      image: Ahmed,
      type: "FrontEnd",
      department: "علوم الحاسب",
      firstName: "احمد",
      secondName: "يسن",
      thirdName: "خضري",
      fourthName: "محمود",
      socialMedia: {
        linkedIn: "yahyasaad1",
        gitHub: "yahyasaad1",
        whatsapp: "01112672183",
        email: "yahyasaad2024@gmail.com",
      },
    },
  ];

  const thanks = [
    {
      id: 1,
      image: user,
      type: "مدير المواد البشرية",
      department: "مواد بشرية",
      firstName: "مجدي",
      secondName: "...",
      thirdName: "...",
      fourthName: "...",
      socialMedia: {
        linkedIn: "magdy",
        gitHub: "magdy",
        whatsapp: "010027471188",
        email: "magdy@gmail.com",
      },
    },
    {
      id: 1,
      image: user,
      type: "الدكتور المشرف",
      department: "علوم الحاسب",
      firstName: "ساره",
      secondName: "احمد",
      thirdName: "...",
      fourthName: "...",
      socialMedia: {
        linkedIn: "magdy",
        gitHub: "magdy",
        whatsapp: "010027471188",
        email: "magdy@gmail.com",
      },
    },
  ];

  return (
    <div className="p-3">
      <div>
        <h2 className="mb-4 text-center text-primary">
          معلومات عامة حول نظام اجازاتي
        </h2>
      </div>
      <div>
        <div>
          <h4>نبذة عن نظام اجازاتي:</h4>
          <h6 className="p-3 line-h-2">
            <span className="text-primary">اجازاتي</span> هو نظام إلكتروني
            متكامل يهدف إلى إدارة طلبات الاجازات داخل المؤسسات التعليمية بطريقة
            حديثة وفعّالة. يوفّر النظام حلاً رقميًا يسهل على الموظفين تقديم
            طلبات الاجازات وتتبع حالتها، مع تمكين الإدارات من مراجعتها واعتمادها
            بسرعة. يتميز النظام بواجهة سهلة الاستخدام، وإدارة واضحة للأدوار
            والصلاحيات، بالإضافة إلى توليد تقارير دقيقة لدعم اتخاذ القرار. يُعد
            "اجازاتي" خطوة نحو تعزيز التحول الرقمي في العمليات الإدارية، مما
            يساهم في تحسين الكفاءة، وتوفير الوقت، وضمان الشفافية في إدارة
            الاجازات.
          </h6>
        </div>
        <div>
          <h4>أهداف نظام اجازاتي:</h4>
          <h6 className="pt-3 ps-3 pe-3">
            {" "}
            <span>1 . تبسيط إدارة الاجازات:</span>{" "}
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {" "}
              أتمتة عملية تقديم الطلبات واعتمادها لتقليل الوقت والجهد.{" "}
            </span>
          </h6>
          <h6 className="ps-3 pe-3">
            {" "}
            <span>2 . تحسين الكفاءة:</span>{" "}
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {" "}
              تسريع معالجة الطلبات وتقليل الأخطاء الإدارية.{" "}
            </span>
          </h6>
          <h6 className="ps-3 pe-3">
            {" "}
            <span>3 . تعزيز التوثيق:</span>{" "}
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {" "}
              إنشاء سجلات رقمية دقيقة وقابلة للتتبع.{" "}
            </span>
          </h6>
          <h6 className="ps-3 pe-3">
            {" "}
            <span>4 . تجربة مستخدم مميزة:</span>{" "}
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {" "}
              واجهة سهلة الاستخدام لمتابعة الطلبات.{" "}
            </span>
          </h6>
          <h6 className="ps-3 pe-3">
            {" "}
            <span>5 . إدارة الصلاحيات:</span>{" "}
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {" "}
              تخصيص أدوار واضحة لكل مستخدم.{" "}
            </span>
          </h6>
          <h6 className="ps-3 pe-3">
            {" "}
            <span>6 . تقارير دقيقة:</span>{" "}
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {" "}
              دعم القرارات بتحليل بيانات الاجازات.{" "}
            </span>
          </h6>
          <h6 className="pb-3 ps-3 pe-3">
            {" "}
            <span>7 . تحقيق الشفافية:</span>{" "}
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {" "}
              عملية موثوقة تقلل الأخطاء اليدوية.{" "}
            </span>
          </h6>
        </div>
        <div>
          <h4>فريق عمل المشروع</h4>
          <div className="d-flex p-5 row justify-content-center">
            {team.map((member, index) => {
              return (
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div key={index} className="rounded-circle overflow-hidden">
                    <img
                      className="w-100 rounded-circle"
                      src={member.image}
                      alt={member.firstName}
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="p-1 d-flex justify-content-center">
                    <h5>
                      {member.firstName} {member.secondName}
                    </h5>
                  </div>

                  <div className="mb-4 d-flex justify-content-center gap-1">
                    {/* <Link className='p-1 bg-dark text-warning box text-center pt-2 hover-type' style={{textDecoration:'none'}} to={`https://github.com/${member.socialMedia.gitHib}`} type="submit">
                                            {member.type}
                                        </Link> */}

                    <Link
                      className="p-1 bg-dark text-warning box text-center pt-2 hover-type"
                      style={{ textDecoration: "none" }}
                      to={`https://github.com/${member.socialMedia.gitHib}`}
                      type="submit"
                    >
                      {member.type}
                    </Link>

                    <Link
                      className="p-1 bg-light box hover"
                      to={`https://wa.me//${member.socialMedia.whatsapp}`}
                      type="submit"
                    >
                      <img
                        style={{ width: "32px", borderRadius: "5px" }}
                        src={
                          "data:image/png;base64,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"
                        }
                        alt={member.firstName}
                      />
                    </Link>

                    <Link
                      className="p-1 bg-light box hover"
                      to={`https://www.linkedin.com/in/${member.socialMedia.linkedIn}`}
                      type="submit"
                    >
                      <img
                        style={{ width: "32px", borderRadius: "7px" }}
                        src={
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAb1BMVEUAd7f///8AcLQAdbbI3OsAa7IAZ7CZvdrj7/bN5PAAc7Von8s7h7/M3+z0+Ps1froSfbtcmMecwt18qtBvpc45j8MYgbwAZK/Y5vGRvNpHj8OmyuLB1uiEsdSnxd/r8vizzeOStdYAXqxLlcZQisC+i4nYAAAGW0lEQVR4nO2d3XqrKhCGgYFoR4Ma82OtGrPb+7/GrUl3V9OoEBJXwc130KcHor4BBgZmkFBKjzkjjovlxw6EUCoD8dvv8rhEIM8wHPG3X+VxIfIeRm6db2S92FZ2MHwRLB0N72CWUTF91VAiAX77NZ4jAEn44bff4lk6cLIEu3yRCMhSukzfachuAYPMRbgj+4X0/84C7H/7DbyeIoCFDEoohECSAlsJ5jYRMrHLm6rivKqqIEqFu/YcRFrzsPd+zpLHoo3QURwBr6Gk15Lr7crBAQpWWUiHxJlzEyEkb4MovTLhliXAmI+yULpxylLjx3qChdKGuEODyTQLlQ1xxQwAq6ZZOpralaoRryoWSsPMjaph5c/RZUhV4gINiClD9ke5Cw2NRToVQ+lL4gDNQa9iurHT/nbG3odnMbeq7J9zikCThdLU9nYGoBxjvmT9ahXGhTbMm+3TZzYy8R/Si+0rvCzXM8y9jrbXjDjpw0jb+wy7A4ai5eZsUTD3NDNqe59ZlAG4xzQXtptmjBUe8zdZP2iSO6Yzke2m+RK/oSWZWu8DsHJBLgAI3XYWWV8x+m7z2gW3GZie37x1oGK6qtnpsLTW+5kXrWo1S5jZ3/0v+kdtA2pntjUQVb7zxqHNWsVKgEObAL0wnmhpMnCKpadpxoabMLfdKbsRptvB+bN8c8aOfROwuH65Qam2xEGWTghJ1B6/oRSbLHGuif0nQCRJWb9V/IVXmyhOwFmUswCQMSYEE6wDcRrFy8vLUi0hbrIzlZ2hZAyxs5p4tprzJPWcbfKQRp42ev1IAWArlu6iU9O0bcX5mvOqbU5Rma6eHjyJK3jPhrUTQyuZTMQj12fxQLidWGHUrIvweD2dlcew4HUpnhpuiKSVozreupkgsmK8QJhfF0Ah8kqOLgJ1BTbx6mmuLCTTrmb709HE7eT1nWf6HYVoRBoVEXuSN6uK0ZKn64YDieLV/mRRdpPx8YDJK4VbfMZUEPaqB1X7q0YtNqoC7WVeB5jkR9W1X+IxPN53mHKt6cdKkzoQqnuvM0umv8nQ6/XxQDB1yEl4vZ2xuvHibmGwZ8n1t7IuastHe85MMHDX7u+n1tmDNPPAgGjuRulUPLjmMA/MSj9e6pqmfIhmFphDfX8b+yz7kBWYAyaJ9E3yT1WPzKnngHnX38W+1esDDW0OGN3Iz2HF5jQzwDyo0HzaaR8MfTUOoLAQRu5NLZqFMOaxLTbChLFh1dgIQ5vVgmAKw1AdK2FkbdZrrISh7ZJgitKondkJI09Gcxo7YWhrNHm2FIYbDTV/B2Z8SVPvobbAFG1wOuX1KWj4PS5bbR+MbPNyj+c9X0bi7KSfsLMx2SGeFYZHSb8d81kSGca1bu1UJp1mRpg+iOj65wXEUtOlNhpp5oORQ0F3wFI9GmmyhDYbjMyH0wdYqtdxTE5knA1mM5YKwd61+k1tMGzOBTORcXfQ2H/qfJr0bpa5YOTEghEInappDQLDZ4LZTM3hhUb8MeXWwMjJUQJQY3ZjshAwD8zbdO8Vrcbv8WEJjFSk3LNM4wexBaZStHdINNpZZkmfeVWMEYAaa+sGByrMASOVuUOo3H+nNLKjZtZKQ6SK8uhlkLQzB4w63wY/1DC5HTCBMnREB8bgIKI5YNQTXvxQz2hO9880Z4DRWIzARB2+oTKJfwdGIzQBEnX92gGzVnu8oDqIzBoYjQU8LZj712fshTE4wM/DeBgP42E8jIfxMB7Gw3gYD+NhPIyH8TAexsN4GA/jYTyMh/EwHsbDeBgP42E8jIfxMB7Gw3gYD+NhPIyH+f/BKHOmHIJhkeqmxXWGgfrkuUp91Aok6swGg4BTgqqbttfx4+pz9xp1UiKAOlPL5MsqqGhnP0OugSnyLLXOKMNSla1pkkDXqZkKZS9uYuHxffI9bgsMCTCa/rbC2iCxqb8v27Z8RFVT3ub0sn0zdn1fQC/zFVjZVOO3CUy/qwRMkHRYKIbuCQJGrk9hsMCgunuP3WXkubo8CNjp68/nP6P2BOD6+q8/97VzGLwHjj/Xy2LtF1NrsCc7t766MiHcEes/7asttiWB9V8p1JUICLf9+5HaOnAil2K3ASSx/3vYmmJbSihfCgzvYOQyqoZtZQdD+Txfevi7wj7xnvQnDS3AOp8/zNrBfDus31mx88H8/wJ4y5VJwIETrgAAAABJRU5ErkJggg=="
                        }
                        alt={member.firstName}
                      />
                    </Link>

                    <Link
                      className="p-1 bg-light box hover"
                      to={`https://www.linkedin.com/in/${member.socialMedia.linkedIn}`}
                      type="submit"
                    >
                      <img
                        style={{ width: "32px", borderRadius: "5px" }}
                        src={
                          "data:image/png;base64,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"
                        }
                        alt={member.firstName}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h4>شكر خاص</h4>
          <div className="d-flex p-5 row justify-content-center">
            {thanks.map((member, index) => {
              return (
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div key={index} className="rounded-circle overflow-hidden">
                    <img
                      className="w-100 rounded-circle"
                      src={member.image}
                      alt={member.firstName}
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="p-1 d-flex justify-content-center">
                    <h5>
                      {member.firstName} {member.secondName}
                    </h5>
                  </div>

                  <div className="mb-4 d-flex justify-content-center gap-1">
                    <Link
                      className="p-1 bg-dark text-warning box text-center pt-2 hover-type"
                      style={{ textDecoration: "none" }}
                      to={`https://github.com/${member.socialMedia.gitHib}`}
                      type="submit"
                    >
                      {member.type}
                    </Link>

                    <Link
                      className="p-1 bg-light box"
                      to={`https://wa.me//${member.socialMedia.whatsapp}`}
                      type="submit"
                    >
                      <img
                        style={{ width: "32px", borderRadius: "5px" }}
                        src={
                          "data:image/png;base64,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"
                        }
                        alt={member.firstName}
                      />
                    </Link>

                    <Link
                      className="p-1 bg-light box"
                      to={`https://www.linkedin.com/in/${member.socialMedia.linkedIn}`}
                      type="submit"
                    >
                      <img
                        style={{ width: "32px", borderRadius: "7px" }}
                        src={
                          "data:image/png;base64,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"
                        }
                        alt={member.firstName}
                      />
                    </Link>

                    <Link
                      className="p-1 bg-light box"
                      to={`https://www.linkedin.com/in/${member.socialMedia.linkedIn}`}
                      type="submit"
                    >
                      <img
                        style={{ width: "32px", borderRadius: "5px" }}
                        src={
                          "data:image/png;base64,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"
                        }
                        alt={member.firstName}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
