'use client'

import { updateEntry } from "@/utils/api";
import { useState } from "react"
import { Autosave, useAutosave } from 'react-autosave';

const Editor = ({ entry }: { entry: { id: string, content: string } }) => {
  const [value, setValue] = useState(entry.content)
  const [saving, setSaving] = useState(false)

  useAutosave({
    data: value,
    onSave: async(_value: string) => {
      setSaving(true)
      const updatedEntry = updateEntry(entry.id, _value)
      setSaving(false)
    }
  })

  return (
    <div className="w-full h-full">
      {saving && "... saving"}
      <textarea 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-[99%] p-8 text-xl outline-none" 
        style={{ resize: 'none' }}
      />
    </div>
  )
}

export default Editor