import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { loginBackground } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
        <div className='fixed -z-20 '>
            <img className='h-screen object-cover' src={loginBackground} alt='logo'/>
        </div>
        <div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
        </div>
        
    </>
  )
}

export default GptSearch