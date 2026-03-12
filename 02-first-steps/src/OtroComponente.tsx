import React from 'react';
interface Props{
    name: string;
}
export const OtroComponente = (props:Props) => {
    console.log(props);
  return (
    <div>OtroComponente</div>
  )
}
