import "./styles/App.css";
import "./styles/normal.css";
import { useState, useEffect } from "react";
import SideMenu from "./components/SideMenu";
import ChatBox from "./components/ChatBox";

const App = () => {
  useEffect(() => {
    getModels();
  }, []);

  const [chatInput, setChatInput] = useState("");
  const [models, setModels] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can I help you today?",
    },
  ]);

  //Clear Chats
  const clearChat = () => {
    setChatLog([]);
  };

  //Get all Models
  const getModels = () => {
    fetch("http://localhost:5000/models")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.models.data);
        //set Models in order alphabetically
        data.models.data.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        setModels(data.models.data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${chatInput}` }];
    setChatInput("");
    setChatLog(chatLogNew);

    //Fetch response to the api, combining the Chat Log array of messages
    //Sending it as a message to localhost:3000 as a post Request
    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
        temperature,
      }),
    });

    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    var scrollToTheBottomChatLog =
      document.getElementsByClassName("chat-log")[0];
    scrollToTheBottomChatLog.scrollTop = scrollToTheBottomChatLog.scrollHeight;
  };

  const handleTemp = (temp) => {
    if (temp > 1) {
      setTemperature(1);
    } else if (temp < 0) {
      setTemperature(0);
    } else {
      setTemperature(temp);
    }
  };

  return (
    <div className="App">
      <SideMenu
        currentModel={currentModel}
        setCurrentModel={setCurrentModel}
        models={models}
        setTemperature={handleTemp}
        temperature={temperature}
        clearChat={clearChat}
      />
      <ChatBox
        chatInput={chatInput}
        chatLog={chatLog}
        setChatInput={setChatInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
