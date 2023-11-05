import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'

function Feedback() {
  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/feedback/list').then((response) => {
      setListOfPosts(response.data)
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <div>
      {listOfPosts.map((value) => {
          return (<div className = 'account' > 
            <div className="nickname" >{value.nickname}</div>
            <div className="title" >{value.title}</div>
            <div className="description" >{value.description}</div>
           </div>
        )
      })
    } 
    </div>
  )
}

export default Feedback
