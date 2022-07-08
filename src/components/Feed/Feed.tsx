import React from 'react'
import Turnt from '../../images/Turnt.PNG';
import { HiOutlinePhotograph } from 'react-icons/hi'
import { useState } from 'react';
import db from '../../backend/Firebase';

interface Props {
  account: null | string;
  username: string;
  bio: string;
  uri: string;
  postText: string;
  setPostText: React.Dispatch<React.SetStateAction<string>>;
  postPhoto: File[];
  setPostPhoto: React.Dispatch<React.SetStateAction<File[]>>;
}
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const Feed = ({account, postText, setPostText, postPhoto, setPostPhoto, username, bio, uri}: Props) => {

  const moddedUri = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  // console.log(moddedUri);

  return (
    <div className='flex-col w-3/5 overscroll-auto'>
      <form>
          <div className='flex flex-row p-1 pt-3 pr-3 pl-3'>
              <img className='border border-gray-dark rounded-3xl w-7 h-7' alt='profilepic' src={moddedUri}></img>
              <div className='flex flex-col pl-1'>
                <div>{username}</div>
                <div className='text-gray'>{bio}</div>
              </div>
              <textarea placeholder='...' className='ml-2 p-1 text-white bg-transparent flex-grow ease-in duration-200 resize-none border border-gray-dark rounded-2xl scrollbar-hide overflow-y-none max-h-8 hover:bg-blackish' ></textarea>
          </div>
          <div className='flex flex-row justify-end gap-3 pr-3 pb-1 border-b-[1px] border-gray-dark items-center'>
            <span className='text-xl ease-in-out duration-700 hover:rotate-45'><HiOutlinePhotograph/></span>
            <button className='border border-gray-dark rounded-2xl pl-1 pr-1 pt-[1px] pb-[2px] items-center ease-in duration-200 hover:bg-[#1f6e1c]'>+</button>
          </div>
      </form>
          <div>
              Posts:<br/>Posts go here
          </div>
    </div>
  )
}

export default Feed;