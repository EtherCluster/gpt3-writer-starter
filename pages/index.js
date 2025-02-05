import Head from "next/head";
import Image from "next/image";
import Video from "next";
import source from "next";
import buildspaceLogo from "../assets/buildspace-logo.png";
import audityman from "../assets/audity.png";
// import tutvid from '../assets/audityone.mp4'
import { useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="Auditymandiv">
            {" "}
            <Image src={audityman} alt="Audity One Logo" />{" "}
            <h3 className="audityone">Audity One</h3>
          </div>
          <div className="header-title">
            <h1>Smart Contract Auditor </h1>
          </div>
          <div className="header-subtitle">
            <h2>Find vulnerabilities in your Smart Contracts</h2>
          </div>
          {/* <ReactPlayer url={tutvid} /> */}
          <video
            width="400"
            height="300"
            controls
            muted
            src="audityone.mp4"
          ></video>

          <div>
            <p>
              Paste your solidity code down below and the AI will give you a
              list of vulnerabilities with their consequences. Note: Generate a
              few times to make sure you squash all the bugs 🪲 Disclaimer: This
              tool is in beta and should not be a source of actual auditing. Use
              at own risk 💀
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
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Audit</p>}
              </div>
            </a>
          </div>
          <div className="prompt-container-don">
            <p className="donate">
              This is a free product but an OpenAI membership needs to be paid
              for by me :) So if you would like to donate to help the project
              grow, feel free to donate here:
            </p>

            <Link href="https://ethercluster.eth.xyz/" target="_blank">
              {" "}
              Donate
            </Link>
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
          </div>
          <div className="badge">
            <p>with love from Ethercluster</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
