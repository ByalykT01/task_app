import React, {useEffect, useState} from 'react'
import axios from '../api/axios'

function Users() {
  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    axios.get('/users/list').then((response) => {
      setListOfPosts(response.data || [])
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <div>
      {listOfPosts.map((value, index) => {
          return (<div className = 'account' key={index} > 
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
