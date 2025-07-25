import type { MouseEvent } from "react";

interface ButtonsProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
}

function Button({label, onClick} : ButtonsProps) {
  return (
    <button onClick={onClick}>{label}</button>
  )
}

export default Button