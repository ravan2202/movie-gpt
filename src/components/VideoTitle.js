import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className="pt-[20%] px-24 absolute  w-screen aspect-video text-white bg-gradient-to-r from-black">
    <h1 className='text-5xl font-bold'>{title}</h1>
    <p className='py-6 text-lg w-1/3 text-justify'>{overview}</p>
    <div>
        <button className='bg-white text-black p-2 px-10 text-xl rounded-lg hover:opacity-80'> ▶️ Play</button>
        <button className='bg-gray-500 text-white p-2 px-10 text-xl bg-opacity-50 rounded-lg mx-3 hover:opacity-80'> More Info</button>
    </div>
    </div>
  )
}

export default VideoTitle 