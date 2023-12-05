// Label.tsx

import React, { HTMLAttributes } from 'react'

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor: string
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  ...props
}: LabelProps) => {
  return (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  )
}

export default Label
