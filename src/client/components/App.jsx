import React, { useState } from 'react'
import classNames from 'classnames'
import { Router, Link } from '@reach/router'
import { useStore } from '@kwhitley/use-store'
import styled from 'styled-components'
import { ListOfPets } from './ListOfPets'
import '../styles/app.scss'
import './App.scss'
import { usePets } from '../hooks/usePets'

export default function App() {
  const {
    pets,
    isLoading,
    agePet,
    removePet,
  } = usePets()

  return (
    <div className="page">
      {
        isLoading
        ? 'Loading pets...'
        : <ListOfPets
            pets={pets}
            ageAction={agePet}
            removeAction={removePet}
            />
      }
    </div>
  )
}
