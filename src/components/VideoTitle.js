import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className="pt-[15%] px-6 md:px-24 absolute  w-screen aspect-video text-white bg-gradient-to-r from-black">
    <h1 className='mt-12 md:mt-0 text-2xl md:text-5xl font-bold'>{title}</h1>
    <p className='hidden md:inline-block py-6 text-lg w-1/3 text-justify'>{overview}</p>
    <div className='md:m-0 my-2' >
  <button className='bg-white text-black p-1 px-6 text-sm md:p-2 md:px-10 md:text-xl rounded-lg hover:opacity-80'>
    Play
  </button>
  <button className=' bg-gray-500 text-white p-1 px-6 text-sm md:p-2 md:px-10 md:text-xl bg-opacity-50 rounded-lg mx-3 hover:opacity-80'>
    More Info
  </button>
</div>
    </div>
  )
}

export default VideoTitle 