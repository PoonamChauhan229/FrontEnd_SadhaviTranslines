import React from 'react';
import { BsPerson} from "react-icons/bs";
import {AiOutlineSetting} from "react-icons/ai";
const Navbar = ({ open, setOpen }) => {
  return (
    <>
    <div className={`bg-dark-navy text-xl text-white h-12 p-5 pt-[1.79%] duration-300 px-5 w-[100%] flex items-center`}>
      <div>{!open ? "Sadhavi Translines" : ""}</div>
      <div className='ml-auto flex gap-4'>
        <div><BsPerson /></div>
        <div><AiOutlineSetting /></div>
      </div>
    </div> 
    </>
  );
}

export default Navbar;

