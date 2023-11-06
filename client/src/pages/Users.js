import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'

function Users() {
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
            <div className="name" >{[value.username]}</div>
            <div className="line1" >{value.email}</div>
            <div className="line2" >{value.age}</div>
           </div>
        )
      })
    } 
    </div>
  )
}

export default Users
