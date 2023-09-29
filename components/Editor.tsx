'use client'

import { updateEntry } from "@/utils/api";
import { useState } from "react"
import { Autosave, useAutosave } from 'react-autosave';
import Spinner from "./Spinner";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [isSaving, setIsSaving] = useState(false)

  const { mood, summary, colour, subject, negative } = analysis
  const analysisData = [
    {name: 'Summary', value: summary},
    {name: 'Subject', value: subject},
    {name: 'Mood', value: mood},
    {name: 'Negative', value: negative ? 'true' : 'false'},
  ]

  useAutosave({
    data: value,
    onSave: async(_value: string) => {
      setIsSaving(true)
      const data = await updateEntry(entry.id, _value)
      setAnalysis(data.analysis)
      setIsSaving(false)
    }
  })

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2 relative">
        <div className="absolute left-0 top-0 p-2">
          {isSaving ? (
            <Spinner />
          ) : (
            <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
          )}
        </div>
        <textarea 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-[99%] p-8 text-xl outline-none" 
          style={{ resize: 'none' }}
        />
      </div>
      <div className="border border-black/10">
        <div className="bg-blue-300 px-6 py-10" style={{backgroundColor: colour}}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <ul>
          {analysisData.map((data) => (
            <li key={data.name} className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10">
              <span className="text-lg font-semibold">{data.name}</span>
              <span>{data.value}</span>
            </li>
            ))}
        </ul>
      </div>
    </div> 
  )
}

export default Editor