import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";
import { useAuth } from "../hooks/useAuth";
import ChatMessage from "../components/ChatMessage";
import { useLocation } from "react-router";

function ChatBotPage() {
  const { user } = useAuth();
  const location = useLocation();
  const result = location.state || "";
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...messages,
      {
        text: inputMessage,
        isBot: false,
      },
    ];
    setMessages(newMessages);
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(inputMessage);
    } else {
      console.error("La connexion WebSocket n'est pas ouverte.");
    }

    setInputMessage("");
    setIsTyping(true);
  };

  useEffect(() => {
    if (!user) return;
    const ws = new WebSocket(`http://localhost:8000/ws/${user.$id}`);
    socket.current = ws;
    ws.onopen = () => {
      console.log("Connexion WebSocket établie,,m");
      ws.send(result);
    };

    ws.onmessage = (event) => {
      const newMessage = {
        text: event.data,
        isBot: true,
      };
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }, 2000);
    };

    ws.onerror = (error) => {
      console.error("Erreur WebSocket :", error);
    };

    ws.onclose = () => {
      console.log("Connexion WebSocket fermée");
    };

    return () => {
      ws.close();
    };
  }, [user, result]);

  return (
    <div className="flex flex-col h-screen bg-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-6 shadow-md relative overflow-hidden border-b border-green-100">
        <div className="absolute inset-0 bg-gradient-to-r from-green-200/40 to-emerald-200/40 animate-pulse"></div>
        <div className="flex items-center justify-center space-x-3">
          <PiPlantFill className="text-3xl text-green-600 animate-bounce" />
          <h1 className="text-3xl font-bold text-green-800">AgroBot AI</h1>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isBot={message.isBot}
          />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-green-800 p-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white/80 backdrop-blur-md border-t border-green-100"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Posez votre question sur l'agriculture du futur..."
            className="flex-1 px-6 py-4 rounded-full bg-green-50 text-green-800 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
          />
          <button
            type="submit"
            className="px-6 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-emerald-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
          >
            <FaPaperPlane className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatBotPage;
