import React from 'react'
import { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut, } from 'firebase/auth';
import { addUser , removeUser} from '../utils/userSlice'
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(store => store.user)

  const showGptSearch = useSelector ((store) => store.gpt.showGptSearch)

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

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  } 

  return (
    <div className='absolute top-0 left-0  w-screen px-8 py-2 bg-gradient-to-b from-black z-40 flex flex-col md:flex-row justify-between'>
        <img 
        className=' w-44 md:mx-0 mx-auto'
        src= {LOGO}
        alt='logo'
        /> 

        {user && (
          <div className='flex items-center justify-center md:justify-between px-1 md:p-4'> 
            <button className='h-10 px-4  my-1 md:my-2  mx-6  bg-red-700 text-white rounded-lg'
            onClick={handleGptSearchClick}>
            {showGptSearch ? "Home" : "GPT Search"}
            </button>
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
          <img className=' mx-6 md:m-6' src={user?.photoURL} alt="user_avatar"/> 
        </div>
        )}
    </div>
  )
}

export default Header