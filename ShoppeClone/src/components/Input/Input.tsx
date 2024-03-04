import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  autoComplete?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Input({
  type,
  name,
  className,
  errorMessage,
  placeholder,
  register,
  rules,
  autoComplete,
  classNameInput = 'p-3 rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full outline-none',
  classNameError = 'mt-1 min-h-[1rem] text-sm text-red-600'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        {...registerResult}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
