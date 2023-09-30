'use client'

import { askQuestion } from '@/utils/api'
import { ChangeEvent, FormEvent, useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setValue('')
    const answer = await askQuestion(value)
    setResponse(answer)
    setLoading(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={value}
          onChange={handleChange}
          placeholder="Ask a Question"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button 
        disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >Ask</button>
      </form>
      {loading && (<div>...loading</div>)}
      {response && (<div>{response}</div>)}
    </div>
  )
}

export default Question