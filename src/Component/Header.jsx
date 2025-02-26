import { useState } from "react";

const Header = ({onSearch, onHome}) => {

      const [searchVal, setSearchVal] = useState("")

      return (
        <div className="p-4 bg-black flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 onClick={() => onHome([])} className="text-[40px] uppercase font-bold text-red-500"
            >Movie</h1>
            <nav className="flex items-center space-x-4">
              <a onClick={() => onHome([])} className="text-white hover:text-red-500 transition duration-300" href="#">Home</a>
              <a className="text-white hover:text-red-500 transition duration-300" href="#">About</a>
              <a className="text-white hover:text-red-500 transition duration-300" href="#">Contact</a>
            </nav>
          </div>
    
          <div className="flex items-center space-x-2">
            <input
              className="text-black px-3 py-2 rounded-md focus:outline-none"
              type="text"
              onChange={(e) => setSearchVal(e.target.value)}
              value={searchVal}
              placeholder="Search"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              onClick={() => onSearch(searchVal)}
            >
              Search
            </button>
          </div>
        </div>
      );
    };
    
    export default Header;
    