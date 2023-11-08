import React from 'react'
import axios from '../api/axios'
import {useEffect, useState} from 'react'

function Feedback() {
  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    axios.get('/feedback/list').then((response) => {
      setListOfPosts(response.data)
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <div>
      {listOfPosts.map((value) => {
          return (<div className = 'account' > 
            <div className="name" >{value.nickname}</div>
            <div className="line1" >{value.title}</div>
            <div className="line2" >{value.description}</div>
           </div>
        )
      })
    } 
    </div>
  )
}

export default Feedback
