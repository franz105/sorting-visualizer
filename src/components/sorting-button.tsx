import React from 'react'

type SortingButtonProps = {
    array: number[],
    name: string,
    onClick: () => void,
    animations: (string | number)[][],
}

export default function SortingButton(
    {   
        array,
        name,
        onClick,
        animations
    }: SortingButtonProps
) {
  return (
    <button onClick={onClick}>
          {name} 
    </button>
  )
}
