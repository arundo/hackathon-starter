import React, { useState, useEffect } from 'react';
import { Router, Link } from '@reach/router';
import styled from 'styled-components';
import Dashboard from './Dashboard.jsx';
import socketIOClient from 'socket.io-client';
import '../styles/app.scss';

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  padding: 1rem 0rem 2rem 0rem;
  height: 100vh;
  max-height: 100vh;

  h1 {
    font-size: 3rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: white;
    @media (max-width: 700px) {
      font-size: 2rem;
    }
  }

  #arundo {
    color: #0182c8;
  }

  em {
    color: #f44336;
    font-style: normal;
    font-size: 2rem;
    display: block;
    @media (max-width: 700px) {
      font-size: 1.5rem;
    }
  }
`;

export default function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(
      socketIOClient(
        `${
          process.env.MODE
            ? 'https://mysterious-garden-30716.herokuapp.com'
            : 'http://localhost:3000'
        }`
      )
    );
  }, []);

  return (
    <CenteredDiv>
      <h1>
        Welcome to the <span id='arundo'>Arundo</span> <em>Women's 2019 Hackathon</em>
      </h1>
      <Dashboard socket={socket} />
    </CenteredDiv>
  );
}
