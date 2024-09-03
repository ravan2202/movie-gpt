import React from 'react'

const GptSearchBar = () => {
  return (
    <div className='pt-[5%]  flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12 rounded-lg'>
        <input
        type='text'
        className='p-3 m-3 col-span-10 rounded-lg'
        placeholder='What would you like to watch today ?'
        />
        <button className='col-span-2 m-4 px-4 bg-red-700 text-white rounded-lg' >
            Search
        </button>
        </form>

    </div>
  )
}

export default GptSearchBar