import React, { useState, useEffect, useRef } from "react";
import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js-dist-min'; // This line is removed to fix the build error
import { Send, Bot, User, BarChart2, Download, X } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  content: any;
  sender: "user" | "bot";
  type: "text" | "chart";
}

const styles = `
  .chatbot-container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; flex-direction: column; height: 100vh; width: 100%; margin: 0 auto; border-radius: 12px; overflow: hidden; background-color: #f9fafb; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
  .chatbot-header { background-color: #ffffff; padding: 1rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
  .chatbot-header h2 { font-size: 1.25rem; font-weight: 600; color: #111827; }
  .language-selector { padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid #d1d5db; background-color: #ffffff; font-size: 0.875rem; }
  .scroll-area { flex-grow: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .message-wrapper { display: flex; gap: 0.75rem; max-width: 80%; }
  .message-wrapper.user { align-self: flex-end; flex-direction: row-reverse; }
  .message-wrapper.bot { align-self: flex-start; }
  .avatar { width: 2.5rem; height: 2.5rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .avatar.user { background-color: #93c5fd; color: #1e40af; }
  .avatar.bot { background-color: #a7f3d0; color: #065f46; }
  .message-content { padding: 0.75rem 1rem; border-radius: 12px; line-height: 1.5; word-wrap: break-word; }
  .message-content.user { background-color: #3b82f6; color: #ffffff; border-top-right-radius: 0; }
  .message-content.bot { background-color: #ffffff; color: #1f2937; border-top-left-radius: 0; border: 1px solid #e5e7eb; }
  .message-content.bot ul { margin: 0; padding-left: 1.2em; }
  .message-content.bot li { margin-bottom: 0.25em; }
  .chatbot-input-area { display: flex; padding: 1rem; border-top: 1px solid #e5e7eb; background-color: #ffffff; gap: 0.5rem; }
  .chatbot-input { flex-grow: 1; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #d1d5db; font-size: 1rem; }
  .chatbot-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); }
  .action-button { padding: 0.75rem; border: none; color: #ffffff; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 500; }
  .action-button.send { background-color: #3b82f6; }
  .action-button.visualize { background-color: #10b981; }
  .action-button:disabled { background-color: #9ca3af; cursor: not-allowed; }
  .typing-indicator { display: flex; align-items: center; gap: 0.25rem; padding: 0.5rem 0; }
  .typing-indicator span { width: 8px; height: 8px; background-color: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
  .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
  .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
  @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .modal-content { background-color: #ffffff; border-radius: 12px; padding: 1.5rem; width: 90%; max-width: 900px; height: 80vh; max-height: 700px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); display: flex; flex-direction: column; }
  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .modal-header h3 { font-size: 1.25rem; font-weight: 600; color: #111827; }
  .modal-buttons { display: flex; gap: 0.5rem; }
  .modal-action-button { background: #e5e7eb; border: none; font-size: 1rem; cursor: pointer; color: #374151; padding: 0.5rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; }
  .modal-body { flex-grow: 1; overflow: hidden; }
`;

const ChartModal = ({ chartData, onClose }: { chartData: any, onClose: () => void }) => {
    const chartRef = useRef<any>(null);

    const downloadChart = () => {
        // Access Plotly from the window object, where react-plotly.js makes it available.
        const Plotly = (window as any).Plotly;
        // The ref now points to the Plot component, which has a property 'el' for the DOM element.
        if (chartRef.current && Plotly) {
            Plotly.toImage(chartRef.current.el, { format: 'png', width: 1200, height: 800 })
                .then((dataUrl: string) => {
                    const a = document.createElement('a');
                    a.href = dataUrl;
                    a.download = 'chart.png';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
        } else {
            console.error("Plotly object not found. Cannot download chart.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Data Visualization</h3>
                    <div className="modal-buttons">
                        <button className="modal-action-button" onClick={downloadChart}>
                            <Download size={18} /> PNG
                        </button>
                        <button className="modal-action-button" onClick={onClose}>
                            <X size={18} />
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    <Plot
                        ref={chartRef}
                        data={chartData.data}
                        layout={{ ...chartData.layout, autosize: true }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%' }}
                        config={{ responsive: true }}
                    />
                </div>
            </div>
        </div>
    );
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", content: "* Hello! I'm your Smart Groundwater Assistant.\n* You can ask me questions about groundwater data, or ask for visualizations.", sender: "bot", type: "text" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (forceVisualize = false) => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), content: inputValue, sender: "user", type: "text" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content, language, chat_history: messages, force_visualize: forceVisualize,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      if (data.type === "chart") {
        const parsedChartData = JSON.parse(data.reply);
        setChartData(parsedChartData);
        setIsModalOpen(true);
        const confirmationMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: "* I have generated a visualization based on your request.",
            sender: "bot", type: "text",
        };
        setMessages((prev) => [...prev, confirmationMessage]);
      } else {
        const botMessage: Message = { id: (Date.now() + 1).toString(), content: data.reply, sender: "bot", type: "text" };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "* Sorry, I encountered an error. Please check the backend connection and try again.",
        sender: "bot", type: "text",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const languages = ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Bengali", "Marathi", "Gujarati", "Punjabi"];

  return (
    <>
      <style>{styles}</style>
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h2>Groundwater Assistant</h2>
          <select className="language-selector" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
        <div className="scroll-area" ref={scrollAreaRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className={`avatar ${msg.sender}`}>{msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}</div>
              <div className={`message-content ${msg.sender}`}>
                {msg.sender === 'bot' ? <ReactMarkdown>{msg.content.replace(/\\n/g, '\n')}</ReactMarkdown> : <p>{msg.content}</p>}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="message-wrapper bot">
               <div className="avatar bot"><Bot size={20} /></div>
               <div className="message-content bot">
                 <div className="typing-indicator"><span></span><span></span><span></span></div>
               </div>
            </div>
          )}
        </div>
        <div className="chatbot-input-area">
          <input type="text" className="chatbot-input" value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question or request a visualization..."
          />
          <button onClick={() => handleSendMessage(true)} disabled={!inputValue.trim() || isTyping} className="action-button visualize">
            <BarChart2 size={20} /> Visualize
          </button>
          <button onClick={() => handleSendMessage(false)} disabled={!inputValue.trim() || isTyping} className="action-button send">
            <Send size={20} />
          </button>
        </div>
      </div>
      {isModalOpen && chartData && <ChartModal chartData={chartData} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ChatBot;

