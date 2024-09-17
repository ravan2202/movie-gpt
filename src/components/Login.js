import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { loginBackground, photoURL } from '../utils/constants';

const Login = () => {

  const[isSignInForm,setIsSignInForm]=useState(true)
  const[errorMessage, setErrorMessage ] = useState(null)
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
          displayName: name.current.value, photoURL:  photoURL
        }).then(() => {
          const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
      
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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage)
    });

    }
  }

  return (
    <div>
        <Header/>
        <img 
        className='absolute h-screen object-cover'
        src= {loginBackground}
        alt='bg'
        />
        <form onSubmit={(e) => e.preventDefault()}
        className='w-[90%] md:w-3/12 absolute p-8 bg-black mx-auto my-36 right-0 left-0 text-white rounded-lg bg-opacity-80'> 
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