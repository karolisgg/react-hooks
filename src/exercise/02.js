import * as React from 'react'

function useLocalStorageState(key, defautValue = '') {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defautValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  })

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
