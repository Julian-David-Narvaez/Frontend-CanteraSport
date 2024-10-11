import Sidebar from "./panel/Sidebar";
import { Outlet } from 'react-router-dom'
import Header from "./panel/Header";

import { useState } from "react";

const Home = () => {
  const [isOpen] = useState(false);
  
    
    
  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1">
        <Header isOpen={isOpen} />
        <hr></hr>
      
          <div className="h-[86vh] overflow-y-scroll p-8">
            <Outlet />
          </div>
      </div>
    </div>
  );
}

export default Home
