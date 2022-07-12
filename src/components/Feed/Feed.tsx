import React, { useState } from 'react'
import Post from '../Feed/Post';
import noaccount from '../../images/noaccount.JPG';
import Form from './Form';


interface Props {
  account: null | string;
  username: string;
  bio: string;
  uri: string;
  loggedIn: boolean;
  tokenId: number | undefined;
}
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const Feed = ({account, username, bio, uri, loggedIn, tokenId}: Props) => {

  // const [loading, setLoading]=useState<boolean>(false);

  // if (loading) return <h1> LOADING...</h1>
  
  return (
    <div className='flex-col w-3/5 overflow-y-scroll scrollbar-hide'>
          {loggedIn ? (
            <Form
              tokenId={tokenId}
              username={username}
              bio={bio}
              uri={uri}
            />
          ) : (
            <div className='flex flex-row p-1 pt-3 pr-3 pl-3 place-items-center select-none pb-6 border-b-[1px] border-gray-dark'>
              <img className='bg-gray-dark border border-gray-dark select-none rounded-3xl w-7 h-7' alt='noprofilepic' src={noaccount}></img>
              <div className='bg-[#970f0f8e] rounded-2xl flex flex-col pl-1 pr-1 ml-1 w-[12rem]'>
                <div className='text-center select-none'>Not Connected</div>
                <div className='text-gray select-none text-center '>Click "Connect" Button</div>
              </div>
              <textarea placeholder='Please make sure you are connected to Rinkeby Test Network and have minted your Soulbound Token!' className='ml-2 p-1 text-white bg-transparent flex-grow ease-in duration-200 resize-none border border-gray-dark rounded-xl scrollbar-hide overflow-y-none max-h-8 hover:bg-blackish' ></textarea>
            </div>
          )}
          <div>
              <Post
                username={username}
                bio={bio}
                uri={uri}
                loggedIn={loggedIn}
              />
          </div>
    </div>
  )
}

export default Feed;