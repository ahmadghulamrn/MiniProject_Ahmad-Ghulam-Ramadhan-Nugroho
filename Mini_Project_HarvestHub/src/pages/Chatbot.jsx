import React, { useState } from "react";
import generateContent from "../services/GoogleGenerativeAi";
import { Layout } from "../components/layout/Layout";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "ai",
      text: "Hai! Saya siap membantu Anda dalam perawatan tanaman. Tanya apa saja!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newChatHistory = [
      ...chatHistory,
      { sender: "user", text: userInput },
    ];
    setChatHistory(newChatHistory);

    try {
      const aiResponse = await generateContent(
        `Saya membutuhkan tips atau informasi tentang perawatan tanaman. Pertanyaan pengguna: ${userInput}`
      );

      setChatHistory([...newChatHistory, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      setChatHistory([
        ...newChatHistory,
        {
          sender: "ai",
          text: "Maaf, saya mengalami kesulitan menjawab saat ini. Coba lagi nanti.",
        },
      ]);
    }

    setUserInput("");
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[80vh] w-full bg-gray-50">
        {/* Header */}
        <div className=" text-green-500 py-4 px-6 shadow-lg">
          <h1 className="text-3xl font-semibold text-center">
            Chatbot HarvestHub
          </h1>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="w-full mx-auto bg-white shadow-md rounded-lg p-4 space-y-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-xl ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <span className="block text-sm font-medium">
                    {message.sender === "user" ? "Anda" : "AI"}:
                  </span>
                  <span className="text-sm">{message.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg px-4 py-3 border-t border-gray-200"
        >
          <div className="flex items-center space-x-3">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Tanyakan tentang perawatan tanaman..."
              required
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="2"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition duration-200"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Chatbot;
