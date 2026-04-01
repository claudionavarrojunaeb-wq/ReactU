import React, { useState } from 'react'
import { useCounter } from '../hooks/usecounter'

export const MyCounterApp = () => {
  const {counter,handleAdd,handleReset,handleSubtract} = useCounter(5);
  // const {counter:counter2,handleAdd:handleAdd2, handleReset:handleReset2,handleSubtract:handleSubtract2} = useCounter()
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
        <h1>Counter: {counter}</h1>
        {/* <h1>Counter: {counter2}</h1> */}
        <div style={{display:'flex', gap: '10px'}}>
            <button onClick={handleAdd}>+1</button>
            {/* <button onClick={handleAdd2}>+1</button> */}
            <button onClick={handleSubtract}>-1</button>
            {/* <button onClick={handleSubtract2}>-1</button> */}
            <button onClick={handleReset}>Reset</button>
            {/* <button onClick={handleReset2}>Reset</button> */}
        </div>
    </div>
  )
}

