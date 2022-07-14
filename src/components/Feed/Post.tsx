import { useState } from 'react'
import mojojojo from '../../images/mojojojo.png'
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "@firebase/firestore";
import {db} from '../../backend/Firebase';

interface Props {
  username: string;
  bio: string;
  uri: string;
  loggedIn: boolean;
  tokenId: number | undefined;
  post: any;
}

const Post = ({username, bio, uri, loggedIn, tokenId, post}: Props) => {

  const [userLikes, setUserLikes] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<Array<string>>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [posts, setPosts] = useState<Array<any>>([]);
  
  const handleLike = () => {
    //<----------- Add something here that updates the likes in Posts in FB
    if (liked && loggedIn == true) {
      setLiked(false);
      setLikes(likes - 1);
      setUserLikes(userLikes - 1);
    } else if (loggedIn == true && userLikes < 1) {
      setLikes(likes + 1);
      setUserLikes(userLikes + 1);
      setLiked(true);
    }
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
      <div className='flex flex-row pt-3 pl-3 pr-3 place-items-center select-none'>
        <img className='border border-gray-dark rounded-full w-7 h-7' alt='profilepic' src={post.profilePic}></img>
        <div className='flex flex-col pl-1 w-[12rem]'>
          <div>{post.username}</div>
          <div className='text-gray'>{post.bio}</div>
        </div>
        <div className='ml-2 p-2 text-white bg-transparent flex-grow resize-none border border-gray-dark select-none rounded-xl max-h-8' >{post.text}</div>
      </div>
      <div className='flex flex-row justify-end gap-3 pr-3 pb-1 pt-1 border-b-[1px] border-gray-dark align-middle place-items-center'>
        <span
          className='text-xl ease-in-out duration-700 hover:text-[#1fd9e6ae] text-[17px] cursor-pointer select-none'
          onClick={handleComment}
          >
          <FaRegComment className='text-xl'/>
        </span>
        <span 
          className='text-xl ease-in-out duration-700 hover:text-[#e61f1fae] flex flex-row cursor-pointer select-none place-items-center'
          onClick={handleLike}
          >
          <span className='text-[12px] pr-[4px]'>{post.likes}</span>
          <AiOutlineHeart className='text-2xl'/>
        </span>
      </div>
    </div>
  )
}

export default Post