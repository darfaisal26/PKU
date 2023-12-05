import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  type: string
  placeholder: string
  required: boolean
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  placeholder,
  required,
  ...props
}: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      {...props}
    />
  )
}

export default Input
