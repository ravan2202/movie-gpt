import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

  const[isSignInForm,setIsSignInForm]=useState(true)
  const[errorMessage, setErrorMessage ] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm)
  }

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value,password.current.value)
    setErrorMessage(message)
    if(message) return;

    // sign up logic
    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed up data
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://lh3.googleusercontent.com/a/ACg8ocI2atI5rIT7Z9E2-wvnGv8tWyl50z_Hp-Ouk7k4TIoGrvAGt_jXQw=s576-c-no"
        }).then(() => {
          const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
          navigate('/browse')
        }).catch((error) => {
          setErrorMessage(error.message)
        });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage)
      });
    }

    // sign in code logic
    else{
     signInWithEmailAndPassword(auth, email.current.value,password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      navigate('/browse')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "- " + errorMessage)
    });

    }
  }

  return (
    <div>
        <Header/>
        <img 
        className='absolute'
        src='https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_large.jpg'
        alt='bg'
        />
        <form onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-8 bg-black mx-auto my-36 right-0 left-0 text-white rounded-lg bg-opacity-80'> 
            <h1 className='font-bold text-3xl py-4'>
             {isSignInForm ? "Sign In": "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input 
              ref={name}
              type='text' 
              placeholder='Full Name' 
              className='p-4 my-4 w-full bg-gray-600'/>
            )}
            <input 
            ref={email}
            type='text' 
            placeholder='Email Address' 
            className='p-4 my-4 w-full bg-gray-600'/>
            <input 
            ref={password}
            type='password' 
            placeholder='Password' 
            className='p-4 my-4 w-full bg-gray-600'/>
            <p className='text-red-500 py-2'>{errorMessage}</p>
            <button 
            className='p-4 my-6 bg-red-700 w-full rounded-lg'onClick={handleButtonClick}>
              {isSignInForm ? "Sign In": "Sign Up"}
            </button>
            {/* {isSignInForm && ()
            } */}
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> New to Netflix? Sign Up Now </p>
            
        </form>
    </div>
  )
}

export default Login