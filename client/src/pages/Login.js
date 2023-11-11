import React from 'react'
import {useRef, useState, useEffect, useContext} from 'react'
import axios from '../api/axios.js'
import AuthContext from '../context/AuthProvider';


const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('/users/login', 
      JSON.stringify({
        username: user,
        password: pwd,
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        },
          'withCredentials': true
      }
      )
      const token = response?.data?.token
      setAuth({username: user, password: pwd, token})
      setUser('')
      setPwd('')
      setSuccess(true)
    } catch(err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400) {
        setErrMsg('Wrong or Missing Username or Password');
    } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg('Login Failed');
    }
    if (errRef.current) {
      errRef.current.focus();
    }
    }
  }

  return (
    <>
    {success ?(
      <section>
        <h1>You are logged in</h1>
        <p>
          <a href='/'>Go to home</a>
        </p>
      </section>
    ) : (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen "} aria-live='assertive'>{errMsg}</p>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          Username:
        </label>

        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e)=>setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor='password'>
          Password:
        </label>

        <input
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          autoComplete='off'
          value={pwd}
          required
        />

        <button>
          Sign in
        </button>
        <p>
          Need an Account? <br/>
          <span>
            <a href="/register">Sign Up</a>
          </span>
        </p>
      </form>
    </section>
  )}
  </>
  )
}

export default Login
