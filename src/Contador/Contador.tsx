import  { useState } from 'react'
import Button from './Button';

function Contador() {
    const [counter, setCounter] = useState<number>(0);

    const handleIncrement = () => setCounter(counter + 1);

    const handleDecrement = () => setCounter(counter - 1);

    const handleReset = () => setCounter(0);

    return (
        <>
            <Button label="+" onClick={handleIncrement} />
            <Button label="-" onClick={handleDecrement} />
            <Button label="reset" onClick={handleReset} />
            <p>counter: {counter}</p>
        </>
    )
}

export default Contador