import React from 'react'
import Turnt from '../../images/Turnt.PNG';
import { HiOutlinePhotograph } from 'react-icons/hi'
import { AiOutlineFileGif } from 'react-icons/ai'


const Feed = () => {
  return (
    <div className='flex-col w-3/5 overscroll-auto'>
        <div className='flex flex-row p-1 pt-3 pr-3 pl-3'>
            <img className='border border-gray-dark rounded-3xl w-7 h-7' alt='profilepic' src={Turnt}></img>
            <div className='flex flex-col pl-1'>
              <div>Off2Eth</div>
              <div className='text-gray'>Full Stack / Blockchain Dev</div>
            </div>
            <textarea placeholder='...' className='ml-2 p-1 text-white bg-transparent flex-grow ease-in duration-200 resize-none border border-gray-dark rounded-2xl scrollbar-hide overflow-y-none max-h-8 hover:bg-blackish' ></textarea>
        </div>
        <div className='flex flex-row justify-end gap-3 pr-3 pb-1 border-b-[1px] border-gray-dark items-center'>
          <span className='text-xl ease-in-out duration-700 hover:rotate-45'><HiOutlinePhotograph/></span>
          <span className='text-xl ease-in-out duration-700 hover:rotate-45'><AiOutlineFileGif/></span>
          <button className='border border-gray-dark rounded-2xl pl-1 pr-1 pt-[1px] pb-[2px] items-center ease-in duration-200 hover:bg-[#1f6e1c]'>+</button>
        </div>
        <div>
            Posts:<br/>Post
        </div>
    </div>
  )
}

export default Feed;