import React, { useRef, useState } from 'react'

const Register = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = () => {
    const passwordValue = passwordRef.current.value;
    const password2Value = password2Ref.current.value;

    setPasswordMatch(passwordValue === password2Value);
  }


  return (
    <section>
      <h1>Register</h1>
      <form>
        <label htmlFor="username" >
          Username: 
          <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          />
        </label>
        
          <label htmlFor="password" >
          Password: 
          <input
          type="text"
          id="password"
          ref={passwordRef}
          autoComplete="off"
          onChange={handlePasswordChange}
          />
          </label>
        
          <label htmlFor="password2" >
          Repeat your password: 
          <input
          type="text"
          id="password2"
          ref={password2Ref}
          autoComplete="off"
          onChange={handlePasswordChange}
          />
        </label>
        {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
        {passwordMatch  && <p style={{ color: 'green' }}>Passwords match!</p>}
      </form>
    </section>
  )
}

export default Register
