import React, { useContext, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from '../Context/ProviderMovie';

const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
};


const MoviesList = ({title,data}) => {
      const HandleMovie = useContext(MovieContext);
  return (
    <div className='text-white p-10 mb-10'>
      <h2 className='uppercase font-bold text-3xl mb-6'>{title}</h2>
      <Carousel responsive={responsive} className="flex items-center">
                  {data.length > 0 && data.map((item) => (
                        <div key={item.id} 
                              className="w-[200px] h-[300px] bg-red-500 relative group"
                              onClick={() => HandleMovie(item.id)}
                        >
                              <div className="group-hover:scale-105 transition-transform duration-300 ease-in-out w-full h-full">
                                    <div className='absolute top-0 left-0 w-full h-full bg-black/30'/>
                                    <img 
                                          src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`} 
                                          alt={item.title} 
                                          className='w-full h-full bg-cover'
                                    />
                                    <div className="absolute bottom-4 left-2 text-center">
                                          <p className='uppercase text-md'>{item.title || item.original_title}</p>
                                    </div>
                              </div>    
                        </div>
                  ))}
      </Carousel>
    </div>
  )
}

export default MoviesList