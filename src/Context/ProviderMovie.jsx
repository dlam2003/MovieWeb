import { createContext, useState } from "react";
import Modal from 'react-modal';
import YouTube from 'react-youtube';

const MovieContext = createContext();
const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
};

const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
};

const MovieProvider = ({ children }) => {
      const [modalIsOpen, setmodalIsOpen] = useState(false);
      const [Ytkey, setYtkey] = useState("");
      const HandleMovie = async (id) => {
            setYtkey("")
            try {
                  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
                  const options = {
                        method: 'GET',
                        headers: {
                              accept: 'application/json',
                              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                        }
                  };

                  const Mv_key = await fetch(url, options);
                  const data = await Mv_key.json();
                  console.log(data.results[0].key);
                  setYtkey(data.results[0].key);
                  setmodalIsOpen(true)
            } catch (error) {
                  setmodalIsOpen(false)
                  console.log(error)
            }
      }
      
      return(
            <MovieContext.Provider value={HandleMovie}>
                  {children}
                  <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setmodalIsOpen(false)}
                        style={customStyles}
                        contentLabel="Example Modal"
                  >
                        <YouTube videoId={Ytkey} opts={opts} />
                  </Modal>
            </MovieContext.Provider>
      )
}

export {MovieProvider, MovieContext}