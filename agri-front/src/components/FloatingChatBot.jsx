import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";
import { useAuth } from "../hooks/useAuth";
import ChatMessage from "../components/ChatMessage";

export default function FloatingChatBot({ isOpen, setIsOpen, result }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const socket = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { text: inputMessage, isBot: false }];
    setMessages(newMessages);

    if (socket.current?.readyState === WebSocket.OPEN) {
      const message = {
        type: "user_message",
        content: inputMessage
      }
      socket.current.send(JSON.stringify(message));
    }

    setInputMessage("");
    setIsTyping(true);
  };

  useEffect(() => {
    if (!user) return;
    const ws = new WebSocket(`https://agri-back-fo2l.onrender.com/ws/${user.$id}`);
    socket.current = ws;
    ws.onopen = () => {
      console.log("Connexion WebSocket établie");
      const initMessage = {
        type: "prompt_init",
        content: JSON.stringify(result),
      };
      ws.send(JSON.stringify(initMessage));
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
    <div
      className={`fixed -bottom-12 left-8 z-50 ${
        isOpen ? "backdrop-blur-3xl" : ""
      }`}
    >
      <div
        className={`rounded-xl absolute bottom-20 left-0.5 w-96 h-[500px] bg-white shadow-xl transition-all duration-300 transform ${
          isOpen
            ? "scale-100 opacity-100 backdrop-blur-3xl"
            : "scale-95 opacity-0 pointer-events-none"
        } flex flex-col`}
      >
        {/* Header fixe */}
        <div className="bg-white/80 rounded-xl backdrop-blur-md p-4 border-green-800 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PiPlantFill className="text-3xl text-green-600 animate-bounce" />
              <h1 className="text-2xl font-bold text-green-800">AgroBot AI</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-green-950 hover:text-emerald-950"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Zone de messages scrollable */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-green-50"
        >
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

        {/* Formulaire fixe en bas */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md rounded-xl border-t border-green-100 p-4 shrink-0"
        >
          <div className="flex gap-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 px-4 py-3 rounded-full bg-green-50 text-green-800 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <FaPaperPlane className="text-md" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
