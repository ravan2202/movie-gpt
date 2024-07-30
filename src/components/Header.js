import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate()
  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
    navigate('/')
    }).catch((error) => {
    navigate('/error')
    });
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-40 flex justify-between'>
        <img 
        className='w-44'
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt='logo'
        />

        {user && (
           <div className='flex p-1 m-2'>
           <img class="w-10 h-10 rounded-full" src={user?.photoURL} alt="Rounded avatar"/>
             <button onClick={handleSignOut}
                 className=" bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                 <svg  className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
                 </svg>
                 <span className='px-2'>Sign Out</span>
             </button>
           </div>
        )}

       
       
    </div>
  )
}

export default Header