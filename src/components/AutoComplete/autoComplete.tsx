import React, { ChangeEvent, useState } from 'react'
import Input, { InputProps } from '../Input/input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[]
  onSelect?: (item: string) => void
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { value, fetchSuggestions, onSelect, ...restProps } = props

  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSugestions] = useState<string[]>([])

  console.info(suggestions)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      const results = fetchSuggestions(value)
      setSugestions(results)
    } else {
      setSugestions([])
    }
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
            </li>
          )
        })}
      </ul>
    )
  }

  const handleSelect = (item: string) => {
    setInputValue(item)
    setSugestions([])
    if (onSelect) {
      onSelect(item)
    }
  }

  return (
    <div className="star-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
