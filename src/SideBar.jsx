import React from 'react'
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FcInTransit } from "react-icons/fc";
import { Menus } from "./utils/constants";
import { RxDashboard } from "react-icons/rx";
import { BsChevronDown } from "react-icons/bs";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const [open,setOpen]=useState(true)
    const [submenuOpen,setSubmenuOpen]=useState(false)
    const navigate=useNavigate()
  return (
    <>
    
    <div className={`bg-dark-navy text-white h-[100%] p-5 pt-3 duration-300 relative px-5  ${open?"w-72":"w-[78px]"} `}>
        <BsArrowLeftShort className={`bg-white text-dark-navy text-3xl rounded-full absolute -right-3 top-3 border border-dark-navy cursor-pointer ${!open && "rotate-180"}`}
        onClick={()=>{setOpen(!open)}}
        />
        <div className="inline-flex">
        <FcInTransit  className="text-4xl rounded cursor-pointer block float-left mr-2"/>
        <h1 className={`text-white origin-left font-meduim text-xl mt-1 font-mono duration-300 ${!open && "scale-0"}`}>Sadhavi</h1>
        </div>
    
        <div className="pt-2">
          {
            Menus.map((element,index)=>(
              <>
                <div key={index}
                className={`text-gray-300 text-sm flex items-center  gap-x-4 cursor-pointer p-2 hover:text-dark-navy hover:bg-white rounded ${element.spacing?"mt-9":"mt-2"}`}
                >
                  <span className="text-2xl block float-left">
                  {/* <RxDashboard/> */}
                    {
                      element.icon?element.icon:<RxDashboard/>
                    }
                  </span>
                  <span className={`text-base font-mono flex-1 ${!open && "hidden"}`
                  }
                  onClick={()=>{navigate(`/${element.navigateUrl}`)}}
                  >{element.title}</span>
                  
                  {element.submenu && (
                    <BsChevronDown className="" onClick={()=>{setSubmenuOpen(!submenuOpen)}}/>
                  )}
               </div> 

                {element.submenu && submenuOpen && open &&(
                  <div>
                      {
                        element.submenuItems.map((elementSubMenu,indexItem)=>(
                          <div key={indexItem}
                          className={`text-gray-300 text-sm flex items-center  gap-x-4 cursor-pointer p-2 hover:text-dark-navy hover:bg-white rounded ${element.spacing?"mt-9":"mt-2"}`}
                          >{elementSubMenu.title}</div>
                        ))
                      }
                  </div>
                )}
                
              </>
            ))
          }
        </div>
     </div> 
     <Navbar open={open} setOpen={setOpen}/> 
  
    </>
  )
}

export default SideBar
