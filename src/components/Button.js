import React, { useState, useEffect } from "react"; 
function Button(){
    const [counter, setCounter] = useState(0);
    const handlerClick = () => setCounter(counter+1);
    useEffect(() => {
        document.title = `You have clicked ${counter} times`
    })
    return(
        <>
            <p>You have clicked {counter} times</p>
            <button onClick={handlerClick}>{counter}</button>
        </>
    )
}

export default Button;