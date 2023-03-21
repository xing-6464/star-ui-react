import axios from 'axios'
import React, { useState, useEffect } from 'react'

const App: React.FC = () => {
  const [title, setTitle] = useState('')
  const postData = {
    title: 'my title',
    body: 'hello man',
  }
  useEffect(() => {
    axios
      .post('https://jsonplaceholder.typicode.com/posts', postData)
      .then((resp) => {
        setTitle(resp.data.title)
      })
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
      </header>
    </div>
  )
}

export default App
