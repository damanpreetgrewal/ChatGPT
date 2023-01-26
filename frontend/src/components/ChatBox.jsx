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
  isDisabled,
}) => {
  const handleUserKeyPress = e => {
    if (e.key === 'Enter' && e.shiftKey === false && !isDisabled) {
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
          <button
            className={isDisabled ? 'btn-disabled' : 'submit'}
            aria-disabled={isDisabled}
            type='submit'
            disabled={isDisabled}
          >
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

  const index = text.indexOf('\n');
  const gptResponse = text
    .substring(index)
    .split('\n')
    .map((str, index) => (
      <p key={index} id={index}>
        {str}
      </p>
    ));

  return (
    <motion.div
      // fade messages in
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.225 }}
    >
      <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
        <div className='chat-message-center'>
          <div className={`avatar ${message.user === 'gpt' && 'chatgpt'}`}>
            {message.user === 'gpt' ? <OpenAISVGLogo /> : <div>You</div>}
          </div>
          <div className='message' id='textarea-nl'>
            {' '}
            {isLoading && <Spinner />}
            {message.user === 'gpt' ? gptResponse : message.message}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBox;
