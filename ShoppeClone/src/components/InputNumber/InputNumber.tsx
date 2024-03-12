import { InputHTMLAttributes, forwardRef, useState } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  autoComplete?: string
  classNameInput?: string
  classNameError?: string
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    errorMessage,
    classNameInput = 'p-3 rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full outline-none',
    classNameError = 'mt-1 min-h-[1rem] text-sm text-red-600',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // Thuc thi call back onChange
      onChange && onChange(event)

      // set localValue
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} value={value || localValue} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
