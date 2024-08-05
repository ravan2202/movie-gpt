import React from 'react'
import { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut, } from 'firebase/auth';
import { addUser , removeUser} from '../utils/userSlice'
import { LOGO } from '../utils/constants';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    navigate('/error')
    });
  }

  useEffect (()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName,photoURL} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
          navigate('/browse')
        } 
        else {
          dispatch(removeUser())
          navigate('/')
        }
      }); 
      return () => unsubscribe()
    },[])

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-40 flex justify-between'>
        <img 
        className='w-44'
        src= {LOGO}
        alt='logo'
        /> 

        {user && (
          <div className='flex px-1 py-4'>
             <button
            onClick={handleSignOut}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
              />
            </svg>
          </button>
          <img className='px-1 mx-6' src={user?.photoURL} alt="user_avatar"/> 
        </div>
        )}
    </div>
  )
}

export default Header