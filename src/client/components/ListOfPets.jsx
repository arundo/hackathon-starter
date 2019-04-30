import React from 'react'
import { Pet } from './Pet'

export const ListOfPets = ({ pets, ageAction, removeAction }) => {
  return (
    <div className="pet-list">
      {
        pets.map((pet) => (
          <Pet key={pet.id} pet={pet} ageAction={ageAction} removeAction={removeAction} />
        ))
      }
    </div>
  )
}
