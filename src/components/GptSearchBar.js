import React, { useRef } from 'react';
import {useDispatch} from 'react-redux'
import genAI from '../utils/genai'
import { API_OPTION } from '../utils/constants';
import { addGptMoviesResults } from '../utils/gptSlice';


const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch()
  const searchMovieTMDB = async (movie) => {
    const data = await fetch ("https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",API_OPTION)

      const json = await data.json()
      return json.results
  }

  const handleGPTSearchClick = async () => {
    // console.log(searchText.current.value);
    try {
      const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Act as a movie recommendation system and suggest some movies for the query :" + 
    searchText.current.value + 
    "only give me names of 5 movies , comma seperated like the example given ahead .Example Result:Gadar,Don,Golmaal,Koi Mil Gaya,Sholay";
      const result = await model.generateContent([prompt]);
      // console.log(result.response.text());
      const genAIText = await result.response.text();
      const genAIresult = genAIText.split(",").map(movie => movie.trim())
      // console.log(genAIresult)

      const promiseArray = genAIresult.map(movie => searchMovieTMDB(movie))
      const tmdbResults = await Promise.all(promiseArray)
      console.log(tmdbResults);
      dispatch(addGptMoviesResults({movieNames:genAIresult,movieResults:tmdbResults}))

    } catch (error) {
      console.error("Error:", error);
    }

  };
  
  

  return (
    <div className='pt-[5%] flex justify-center'>
      <form
        className='w-1/2 bg-black grid grid-cols-12 rounded-lg'
        onSubmit={(e) => e.preventDefault()} // Correctly prevent form submission
      >
        <input
          ref={searchText}
          type='text'
          className='p-3 m-3 col-span-10 rounded-lg'
          placeholder='What would you like to watch today?'
        />
        <button
          className='col-span-2 m-4 px-4 bg-red-700 text-white rounded-lg'
          onClick={handleGPTSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;