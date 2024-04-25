import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <>
      <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
        <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày Sinh</div>
        <div className='w-[80%] pl-5'>
          <div className='flex justify-between'>
            <select
              onChange={handleOnChange}
              name='date'
              value={value?.getDate() || date.date}
              className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange'
            >
              <option disabled>Ngay</option>
              {range(1, 32).map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              onChange={handleOnChange}
              name='month'
              value={value?.getMonth() || date.month}
              className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange'
            >
              <option disabled>Thang</option>
              {range(0, 12).map((item) => (
                <option value={item} key={item}>
                  {item + 1}
                </option>
              ))}
            </select>
            <select
              onChange={handleOnChange}
              name='year'
              value={value?.getFullYear() || date.year}
              className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange'
            >
              <option disabled>Nam</option>
              {range(1990, 2025).map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-1 text-red-600 text-sm min-h-[1.25rem]'>{errorMessage}</div>
        </div>
      </div>
    </>
  )
}
