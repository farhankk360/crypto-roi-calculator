import React from 'react'

interface InputProps {
  label?: string
  labelClassName?: string
  inputClassName?: string
  placeholder?: string
  type?: string
  min?: number
  name?: string
  value?: string | number
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    placeholder,
    type,
    iconLeft,
    iconRight,
    labelClassName,
    inputClassName,
    name,
    value,
  } = props

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (props.onChange) {
      props.onChange(event)
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label
          className={`mb-1 block text-sm font-semibold text-black ${labelClassName}`}
        >
          <p className="text-sm text-black dark:text-white">{label}</p>
        </label>
      )}

      <div className="relative">
        {iconLeft && (
          <span
            className="absolute inset-y-0 flex items-center"
            style={{ paddingLeft: 14 }}
          >
            {iconLeft}
          </span>
        )}
        <input
          value={value}
          placeholder={placeholder}
          type={type}
          min={props.min}
          name={name}
          onChange={handleInputChange}
          className={`${inputClassName} w-full appearance-none rounded border bg-slate-100 py-2 ${
            iconLeft ? 'px-10' : 'px-2'
          } text-black dark:border-slate-600 dark:bg-slate-700 dark:text-white`}
        />
        {iconRight && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-5">
            {iconRight}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input
