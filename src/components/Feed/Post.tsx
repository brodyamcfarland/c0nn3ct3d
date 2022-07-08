import React from 'react'
import mojojojo from '../../images/mojojojo.png'

interface Props {
  username: string;
  bio: string;
  uri: string;
}

const Post = ({username, bio, uri}: Props) => {
  return (
    <div className='flex flex-row p-1 pt-3 pr-3 pl-3 place-items-center' >
      <img className='border border-gray-dark rounded-3xl w-7 h-7' alt='profilepic' src={mojojojo}></img>
      <div className='flex flex-col pl-1 w-[12rem]'>
        <div>Mojo-jojojo</div>
        <div className='text-gray'>Bad Guy</div>
      </div>
      <div className='ml-2 p-1 text-white bg-transparent flex-grow ease-in duration-200 resize-none border border-gray-dark rounded-3xl max-h-8 hover:bg-blackish' >Dam this shit actually busssin fr.</div>
    </div>
  )
}

export default Post