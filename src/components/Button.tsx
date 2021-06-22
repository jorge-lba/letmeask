import { ButtonHTMLAttributes, useState } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button (props: ButtonProps) {
  return (
    <button className="button" { ...props } />
  )
}

export { Button }