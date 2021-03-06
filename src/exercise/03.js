import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')
  const handleChange = event => {
    setName(event.target.value)
  }
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={handleChange} />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  )
}

export default App
