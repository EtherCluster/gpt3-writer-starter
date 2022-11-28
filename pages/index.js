import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';




const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };


  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div>   <h3 className='audityone'>Audity One</h3></div>
          <div className="header-title">
         
            <h1>Smart Contract Auditor </h1>
          </div>
          <div className="header-subtitle">
            <h2>Find vulnerabilities in your Smart Contracts</h2>
            
          </div>
    <div>
    <p>Paste your soldity code down below and the AI will give you a list of vulnerabilities with their consequences.
      Note: Generate a few times to make sure you squash all the bugs 🪲 Disclaimer: This tool is in beta and should not be a source of actual auditing. Use at own risk 💀
    </p>

    </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
        <textarea
  className="prompt-box"
  placeholder="Paste your Smart Contract below"
  value={userInput}
  onChange={onUserChangedText}
/>;
<div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Audit</p>}
    </div>
  </a>

</div>

  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>

      </div>

  
      <div className="badge-container grow">
        <a
          href="https://twitter.com/ethercluster"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div><div className="badge">
            
            <p>with love from Ethercluster</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
