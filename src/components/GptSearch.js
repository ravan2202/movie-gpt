import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { loginBackground } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
        <div className='fixed -z-20 '>
            <img src={loginBackground} alt='logo'/>
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch