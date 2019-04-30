import { useEffect } from 'react'
import { useStore } from '@kwhitley/use-store'
import { pets } from '../data/pets'

export const usePets = () => {
  const [ items, setItems ] = useStore('pets', [])
  const [ isLoading, setIsLoading ] = useStore('pets:isLoading', false)

  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setItems(pets)
      setIsLoading(false)
    }, 1000)
  }, [])

  // this function removes a pet from the list of pets
  const removePet = (pet) => setItems(items.filter(i => i.id !== pet.id))

  // this function adds one year to the age of selected pet
  const agePet = (pet) => setItems(items.map(
    p => p.id !== pet.id ? p : ({ ...pet, age: pet.age + 1 })
  ))

  return {
    pets: items,
    isLoading,
    agePet,
    removePet,
  }
}
