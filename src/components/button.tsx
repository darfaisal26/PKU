import React, { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  children: ReactNode
  customClassName?: string
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  children,
  customClassName,
  ...props
}: ButtonProps) => {
  const combinedClassName = customClassName || 'bg-primary'

  return (
    <button className={combinedClassName} {...props}>
      {title}
    </button>
  )
}

export default CustomButton
