import React, { useState, useRef, useEffect } from "react"; 
import axios from "axios";

const colors = {
  bg: "#f0f0f0",
  botBg: "#e3f2fd",
  userBg: "#e8f5e9",
  buttonBg: "#4caf50",
  buttonFg: "white",
  textFg: "#263238",
  entryBg: "white"
};

const ChatBot = ({ messageText }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "مرحبًا! كيف يمكنني مساعدتك اليوم؟" }
  ]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // إرسال الرسالة تلقائيًا عند تحديث inputText
  useEffect(() => {
    if (messageText) {
      setInputText(messageText);

      // انتظار التحديث ثم إرسال الرسالة تلقائيًا
      setTimeout(() => {
        handleSend(messageText);
      }, 100); // إعطاء مهلة قصيرة لضمان تحديث inputText
    }
  }, [messageText]);

  const handleSend = async (text) => {
    const trimmedText = text?.trim() || inputText.trim();
    if (trimmedText) {
      const newMessage = { sender: "user", text: trimmedText };
      setMessages((prev) => [...prev, newMessage]);

      try {
        const response = await axios.post("http://127.0.0.1:5000/api/chatbot", { message: trimmedText });
        const botResponse = response.data.response;
        setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      } catch (error) {
        setMessages((prev) => [...prev, { sender: "bot", text: "حدث خطأ في الاتصال بالسيرفر." }]);
        console.error("Error:", error);
      }

      setInputText(""); // تفريغ الحقل بعد الإرسال
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-4" dir="rtl">
      <div className="w-100 max-w-2xl box">
        <div className="card-body">
          <div className="overflow-auto mb-3 p-3" style={{ height: "450px", backgroundColor: colors.bg }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${
                  msg.sender === "bot"
                    ? "bg-primary text-white"
                    : "bg-success text-white text-end"
                }`}
                style={{
                  textAlign: "right !important",
                  direction: "rtl",
                }}
              >
                {msg.text.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="input-group">
            <input
              type="text"
              className="form-control ms-1"
              placeholder="اكتب سؤالك هنا..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ textAlign: "right", direction: "rtl", borderRadius: "5px" }}
            />
            <button className="btn btn-success" style={{ borderRadius: "5px" }} onClick={() => handleSend()}>
              إرسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
