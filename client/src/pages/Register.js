import React, { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../api/axios'

const USER_REGEX = /^[a-zA-Z0-9-_][a-zA-Z0-9-_]{3,30}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,30}$/
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)
  
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    console.log(result)
    console.log(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => { 
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async(e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    const v3 = EMAIL_REGEX.test(email)

    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry')
      return
  
    }
    try{
      const response = await axios.post('/users', 
      JSON.stringify({
        username: user,
        email,
        password: pwd,
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        },
          'withCredentials': true
      }
      )
      console.log(response.data)
      console.log(response.accessToken)
      setSuccess(true)
    } catch(e) {
      if (e.response) {
        if (e.response.status === 409) {
          setErrMsg('Username taken');
        } else {
          setErrMsg('Registration failed');
        }
      } else {
        setErrMsg('No server response');
      }
      errRef.current.focus();
    }
  }


  return (
    <>
      {success ?(
        <section>
          <h1>Success!</h1>
          <p>
            <a href='/signin'>Sign in</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
            Username:
            <span className={validName ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <span className={ validName || !user ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

          </label>

          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e)=>setUser(e.target.value)}
            required
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />

          <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 30 numbers<br/>
            Letters, numbers, hyphens and underscores allowed
          </p>

          <label htmlFor='email'>
            Email:
            <span className={validEmail? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <span className={ validEmail ||!email? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>

          <input
            type = 'email'
            id = 'email'
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            required
            aria-invalid = {validEmail? 'false' : 'true'}
            aria-describedby='emailnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />

          <p id='emailnote' className={emailFocus && email &&!validEmail? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Invalid email address
          </p>

          <label htmlFor='password'>
            Password:

            <span className={validPwd ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <span className={ validPwd || !pwd? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>

          <input
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          autoComplete='off'
          required
          aria-invalid={validPwd? 'false' : 'true'}
          aria-describedby='pwdnote'
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}          
          />

          <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 30 characters<br/>
          Must include at least on lowercase <br/>
          letter and at least one number.
          </p>

          <label htmlFor='match-password'>
            Confirm password: 
            <span className={validMatch? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={ validMatch ||!matchPwd? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>

          <input
            type = 'password'
            id = 'match-password'
            onChange={(e) => setMatchPwd(e.target.value)}
            autoComplete='off'
            required
            aria-invalid={validMatch? 'false' : 'true'}
            aria-describedby='matchnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />

          <p id='matchnote' className={ matchFocus && !validMatch? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Passwords must match
          </p>

          <button disabled={!validName || !validPwd || !validMatch}>
            Sign up
          </button>
        </form>
    </section>
    )}
    </>
  )
}

export default Register
