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
import { sendMsgToOpenAI } from "./openai";
import { useState } from 'react';

function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
     
      const userMsg = { text: input, isBot: false };
      setMessages(prev => [...prev, userMsg]);

      setInput("");

     
      const res = await sendMsgToOpenAI(input);

     
      const botMsg = { text: res, isBot: true };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              <img src={addButton} alt='' className='addBtn' />
              New Chat
            </button>

            <div className='upperSideBottom'>
              <button className='query'>
                <img src={msgIcon} alt='' />What is programming ?
              </button>
              <button className='query'>
                <img src={msgIcon} alt='' />How to use an API ?
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
              <img
                className='chatimg'
                src={msg.isBot ? ChatgptLogo : user_icon}
                alt=''
              />
              <p className='txt'>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className='chat-footer'>
          <input className='inp' type='text' placeholder='Send a message'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className='send' onClick={handleSend}>
            <img src={send} alt='send' />
          </button>
        </div>

        <p>ChatAI may produce incorrect information.</p>
      </div>
    </div>
  );
}

export default App;