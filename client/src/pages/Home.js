import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'

function Home() {
  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/users/list').then((response) => {
      setListOfPosts(response.data)
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <div>
      {listOfPosts.map((value) => {
          return (<div className = 'account' > 
            <div className="name" >{value.name}</div>
            <div className="email" >{value.email}</div>
            <div className="age" >{value.age}</div>
           </div>
        )
      })
    } 
    </div>
  )
}

export default Home
