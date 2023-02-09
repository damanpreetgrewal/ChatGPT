import '../styles/App.css';
import '../styles/normal.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SideMenu from '../components/SideMenu';
import ChatBox from '../components/ChatBox';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [models, setModels] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [currentModel, setCurrentModel] = useState('text-davinci-003');
  const [chatLog, setChatLog] = useState([]);
  const [isDisabled, setIsDisabled] = useState(chatInput.trim().length === 0);

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    getModels();

    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    setIsDisabled(chatInput.trim().length === 0);
  }, [chatInput, setIsDisabled]);

  //Clear Chats
  const clearChat = () => {
    setChatLog([]);
  };

  //Get all Models
  const getModels = () => {
    fetch('/models')
      .then(res => res.json())
      .then(data => {
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

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (chatInput !== null && chatInput !== '') {
      let chatLogNew = [...chatLog, { user: 'me', message: `${chatInput}` }];
      if (chatLogNew[0].message !== '') {
        setChatInput('');
        setChatLog(chatLogNew);

        //Fetch response to the api, combining the Chat Log array of messages
        //Sending it as a message to localhost:3000 as a post Request
        const messages = chatLogNew.map(message => message.message).join('\n');

        let max_tokens = 100;

        if (currentModel === 'code-davinci-002') {
          max_tokens = 64;
        }

        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: messages,
            currentModel,
            temperature,
            max_tokens,
          }),
        });

        const data = await response.json();

        setChatLog([
          ...chatLogNew,
          { user: 'gpt', message: `${data.message}` },
        ]);

        var scrollToTheBottomChatLog =
          document.getElementsByClassName('chat-log')[0];

        scrollToTheBottomChatLog.scrollTop =
          scrollToTheBottomChatLog.scrollHeight;

        setIsLoading(false);
      }
    }
  };

  const handleTemp = temp => {
    if (temp > 1) {
      setTemperature(1);
    } else if (temp < 0) {
      setTemperature(0);
    } else {
      setTemperature(temp);
    }
  };

  return (
    <div className='App'>
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
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default Home;
