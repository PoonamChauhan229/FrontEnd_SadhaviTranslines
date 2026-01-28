import React from "react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

const Navbar = ({ open }) => {
  return (
    <div
    className={`bg-dark-navy text-xl text-white h-12 flex items-center px-5 duration-300 fixed top-0 left-0 w-full z-0`}
      style={{
        marginLeft: open ? "18rem" : "4.875rem", // 72 = 18rem, 78px = 4.875rem
      }}
    >
      
        {!open && (
           <div className="ms-5 transition-opacity duration-300 ease-in-out">
        Sadhavi Translines
      </div>
        )
      }
     

      <div className="ml-auto flex gap-4">
        <BsPerson />
        <AiOutlineSetting />
      </div>
    </div>
  );
};

export default Navbar;
