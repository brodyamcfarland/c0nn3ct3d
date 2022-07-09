import React, { useState } from 'react'
import mojojojo from '../../images/mojojojo.png'
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';

interface Props {
  username: string;
  bio: string;
  uri: string;
  loggedIn: boolean;
}

const Post = ({username, bio, uri, loggedIn}: Props) => {

  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<Array<string>>([]);
  

  const handleLike = () => {
    if (loggedIn == true) {
      setLikes(likes + 1);
    }
    //Need to cap the likes for 1 per post
  }

  const handleComment = () => {

  }

  const handleDelete = () => {
    //Post Owner Only
  }

  const handleEdit = () => {
    //Post Owner Only
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row pt-3 pl-3 pr-3 place-items-center' >
        <img className='border border-gray-dark rounded-3xl w-7 h-7' alt='profilepic' src={mojojojo}></img>
        <div className='flex flex-col pl-1 w-[12rem]'>
          <div>Mojo-jojojo</div>
          <div className='text-gray'>Bad Guy</div>
        </div>
        <div className='ml-2 p-2 text-white bg-transparent flex-grow ease-in duration-200 resize-none border border-gray-dark rounded-xl max-h-8 hover:bg-blackish' >Dam this shit actually busssin fr.</div>
      </div>
      <div className='flex flex-row justify-end gap-3 pr-3 pb-1 border-b-[1px] border-gray-dark align-middle'>
        <span
          className='text-xl ease-in-out duration-700 hover:text-[#1fd9e6ae] pt-1 pr-1 text-[17px] cursor-none'
          onClick={handleComment}
          >
          <FaRegComment/>
        </span>
        <span 
          className='text-xl ease-in-out duration-700 hover:text-[#e61f1fae] pt-1 pr-1 flex flex-row'
          onClick={handleLike}
          >
          <span className='text-[16px]'>{likes}</span>
          <AiOutlineHeart/>
        </span>
      </div>
    </div>
  )
}

export default Post