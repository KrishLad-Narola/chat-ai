import './App.css';
import GptLogo from "./assets/chatgpt.svg";
import addButton from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import Home from "./assets/home.svg";
import Saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import send from "./assets/send.svg";
import user_icon from "./assets/user-icon.png";
import ChatgptLogo from "./assets/chatgptLogo.svg";
import ReactMarkdown from 'react-markdown';

import { useState, useEffect, useRef } from 'react';
import { getAIResponse } from './API/getAiResponese';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);


  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const userMsg = { text: input, isBot: false };
      setMessages(prev => [...prev, userMsg]);

      setInput("");

      const res = await getAIResponse(input);
      console.log(res)

      const botMsg = { text: res, isBot: true };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="App">


      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <div className='logo'>
              <img src={GptLogo} alt='logo' />
              <div className='brand'>ChatAI</div>
            </div>

            <button className='midBtn'>
              <img width={20} src={addButton} alt='' />
              New Chat
            </button>

            <div className='upperSideBottom'>
              <button className='query'>
                <img src={msgIcon} alt='' />What is programming?
              </button>
              <button className='query'>
                <img src={msgIcon} alt='' />How to use an API?
              </button>
            </div>
          </div>
        </div>

        <div className='lowerSide'>
          <div className='listItems'><img src={Home} alt='' />Home</div>
          <div className='listItems'><img src={Saved} alt='' />Saved</div>
          <div className='listItems'><img src={rocket} alt='' />Upgrade</div>
        </div>
      </div>

     
      <div className='main'>

        
        <div className='chats'>
          {messages.map((msg, i) => (
            <div key={i} className={`chat ${msg.isBot ? "bot" : ""}`}>
              <img className='chatimg' src={msg.isBot ? ChatgptLogo : user_icon} alt='' />

             
              <div className='txt'>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={chatRef}></div>
        </div>


        <div className='chat-footer'>
          <div className='inp'>
            <input
              type='text'
              placeholder='Send a message'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            // onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className='send' onClick={handleSend}>
              <img src={send} alt='send' />
            </button>
          </div>
        </div>

        <p className="note">ChatAI may produce incorrect information.</p>
      </div>
    </div>
  );
}

export default App;