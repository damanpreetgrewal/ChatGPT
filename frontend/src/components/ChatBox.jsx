import OpenAISVGLogo from '../icons/OpenAISVGLogo';
import Hero from './Hero';
import { motion } from 'framer-motion';
import { useTypewriter } from 'react-simple-typewriter';
import Spinner from './Spinner';

// Primary Chat Window
const ChatBox = ({
  chatLog,
  setChatInput,
  handleSubmit,
  chatInput,
  isLoading,
}) => {
  const handleUserKeyPress = e => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      handleSubmit(e);
    }
  };

  return (
    <section className='chatbox'>
      {chatLog.length === 0 && <Hero />}
      <div className='chat-log'>
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message} isLoading={isLoading} />
        ))}
      </div>
      <div className='chat-input-holder'>
        <form className='form' onSubmit={handleSubmit}>
          <textarea
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            className='chat-input-textarea'
            onKeyPress={handleUserKeyPress}
          ></textarea>
          <button className='submit' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

// Individual Chat Message
const ChatMessage = ({ message, isLoading }) => {
  const [text] = useTypewriter({
    words: [message.message],
    typeSpeed: 15,
  });

  return (
    <motion.div
      // fade messages in
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
        <div className='chat-message-center'>
          <div className={`avatar ${message.user === 'gpt' && 'chatgpt'}`}>
            {message.user === 'gpt' ? <OpenAISVGLogo /> : <div>You</div>}
          </div>
          <div className='message'>
            {' '}
            {isLoading && <Spinner />}
            {message.user === 'gpt' ? text.trimStart() : message.message}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBox;
