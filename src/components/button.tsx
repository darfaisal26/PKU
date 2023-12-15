import React, { ReactNode, ButtonHTMLAttributes } from 'react'
// import { Loader2 } from 'lucide-react' // Update the path

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string | ReactNode
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
