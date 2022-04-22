import React, { useState, useEffect } from 'react'


function App(){
    const[data, setData] = useState([{}])
    useEffect(() =>{
        fetch("/home").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])
  return (
      <div>
          {(typeof data.message === "undefined") ? (
              <p>Loading...</p>
          ) : (
              data.message.map((hello,i) => (
                  <p key={i}>{hello}</p>
              ))
          )}
      </div>
  )
}

export default App;
