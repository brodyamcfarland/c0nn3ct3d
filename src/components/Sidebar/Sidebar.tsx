import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { BiEnvelope } from 'react-icons/bi';
import { RiCoinLine } from 'react-icons/ri';
import { GiSpikedHalo } from 'react-icons/gi';

//TODO: 1. Make a ternary operation for either a Connect Button to show up if not connected or the Profile widget w/ pic if connected.

const Sidebar = () => {
  return (
    <div className='flex flex-col w-1/5 p-3 ml-13 gap-3 border-r-[1px] border-gray-dark'>
        <div className='text-4xl font-VT323'>c0nn3ct3d</div>
        <div className='flex flex-row border border-gray-dark p-1 rounded-2xl items-center ease-in duration-200 hover:bg-gray-dark'>
          <span className='text-xl p-1'><AiOutlineHome/></span>
          Home
        </div>
        <div className='flex flex-row border border-gray-dark p-1 rounded-2xl items-center ease-in duration-200 hover:bg-gray-dark'>
          <span className='text-xl p-1'><BiBell/></span>
          Notifications
        </div>
        <div className='flex flex-row border border-gray-dark p-1 rounded-2xl items-center ease-in duration-200 hover:bg-gray-dark'>
          <span className='text-xl p-1'><BiEnvelope/></span>
          Messages
        </div>
        <div className='flex flex-row border border-gray-dark p-1 rounded-2xl items-center ease-in duration-200 hover:bg-gray-dark'>
          <span className='text-xl p-1'><RiCoinLine/></span>
          Profile
        </div>
        <div className='flex flex-row border border-gray-dark p-1 rounded-2xl items-center ease-in duration-200 hover:bg-gray-dark'>
          <span className='text-xl p-1'><GiSpikedHalo/></span>
          Soulbound
        </div>
        <div className='flex flex-row pt-10'>
            <img className='border border-gray-dark rounded-3xl w-7 h-7'></img>
            <div className='flex flex-col pl-1'>
              <div>Off2Beans</div>
              <div>Full Stack / Blockchain Dev</div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar