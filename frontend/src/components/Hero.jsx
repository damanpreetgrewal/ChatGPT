import React from 'react';
import '../styles/Hero.css';
import HeroInfo from './HeroInfo';

function Hero() {
  return (
    <div className='hero-container'>
      <h1 className='hero-heading'>ChatGPT</h1>
      <div className='info-container'>
        <div className='info-sub-container container1'>
          <div className='info-heading'>
            <svg
              className='hero-svg'
              stroke='currentColor'
              fill='none'
              strokeWidth={1.5}
              viewBox='0 0 24 24'
              strokeLinecap='round'
              strokeLinejoin='round'
              height='2em'
              width='2em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx={12} cy={12} r={5} />
              <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
            </svg>
            <h3>Examples</h3>
          </div>
          <HeroInfo info={'Ask general questions about anything you feel like!'} />
          <HeroInfo
            info={'Got any creative ideas for a 10 year old’s birthday?'}
          />
          <HeroInfo info={'How do I make an HTTP request in Javascript?'} />
        </div>

        <div className='info-sub-container container2'>
          <div className='info-heading'>
            <svg
              className='hero-svg'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              aria-hidden='true'
              height='2em'
              width='2em'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
              />
            </svg>
            <h3>Capabilities</h3>
          </div>
          <HeroInfo
            info={'Remembers what user said earlier in the conversation'}
          />
          <HeroInfo info={'Allows user to provide follow-up corrections'} />
          <HeroInfo info={'Trained to decline inappropriate requests'} />
        </div>

        <div className='info-sub-container container3'>
          <div className='info-heading'>
            <svg
              className='hero-svg'
              stroke='currentColor'
              fill='none'
              strokeWidth={1.5}
              viewBox='0 0 24 24'
              strokeLinecap='round'
              strokeLinejoin='round'
              height='2em'
              width='2em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01' />
            </svg>
            <h3>Limitations</h3>
          </div>
          <HeroInfo info={'May occasionally generate incorrect information'} />
          <HeroInfo
            info={
              'May occasionally produce harmful instructions or biased content'
            }
          />
          <HeroInfo info={'Limited knowledge of world and events after 2021'} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
