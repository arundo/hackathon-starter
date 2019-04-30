import React from 'react'
import './Pet.scss'

export const Pet = ({ pet, ageAction, removeAction }) => {
  return (
    <div className="pet">
      <h1>{ pet.name }</h1>
      <p>{ pet.name } is a { pet.age } year old { pet.type }.</p>
      <button onClick={() => removeAction(pet)}>Delete</button>
      <button onClick={() => ageAction(pet)}>Age Me</button>
    </div>
  )
}
