import './App.css';
import { useEffect, useState } from 'react'
import { participants } from './data';

function App() {
  const [isGiftView, setIsGiftView] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(false)
  const [toBeGifted, setToBeGifted] = useState(null)

  const submitForm = (e) => {
    e.preventDefault()
    const result = participants.find((p) => {
      return p.id === id
    })
    if (!result) {
      setError(true)
      return
    }
    setError(false)
    setIsGiftView(true)
    setToBeGifted(result)
  }

  useEffect(() => {
    const names = participants.map(({name}) => name)
    let remainingNames = [...names]
    const results = []

    participants.forEach(({name, restrictions}) => {
      const options = remainingNames.filter((name) => {
        return !restrictions.includes(name)
      })

      const to = options[Math.floor(Math.random() * options.length)]

      results.push({
        name,
        to: btoa(to)
      })
      remainingNames = remainingNames.filter(rn => {
        return rn !== to
      })
    })

    console.log(results);

  }, [])

  return (
    <div className="App">
      {!isGiftView && <header className="App-header">
        <p>
          Wrzuć swojego ID-ka, którego dostał*ś na priv:
        </p>
        <form onSubmit={submitForm}>
          <input onChange={(e) => setId(e.target.value)}></input>
          <button type='submit'>Poka kogo mam</button>
        </form>
        {error && <p className='error'>I właśnie przed takimi osobami jak Ty trzeba zabezpieczać aplikacje, bo nie możesz nawet dobrze skopiować wiadomości xD Wklej jeszcze raz pliz</p>}
      </header>}
      {isGiftView && <header className="App-header">
        <p>Osoba, którą wylosował*ś to:</p>
        <strong>{atob(toBeGifted.givingGiftTo)}</strong>
      </header>}
    </div>
  );
}

export default App;
