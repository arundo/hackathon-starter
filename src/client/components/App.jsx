import React from 'react'
import classNames from 'classnames'
import { Router, Link } from '@reach/router'
import styled from 'styled-components'
import Dashboard from './Dashboard.jsx'
import '../styles/app.scss'

const CenteredDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2em 2em 5em;
  font-size: 4vmax;

  em {
    color: pink;
    font-style: normal;
    font-size: 1.3em;
    display: block;
  }
`

export default function App() {
  return (
    <CenteredDiv>
      <p>Welcome to the Arundo <em>Women's 2019 Hackathon</em></p>
      <Dashboard />
    </CenteredDiv>
  )
}
