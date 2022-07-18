import { useState } from 'react'
import { FaRegComment } from 'react-icons/fa';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, where, getDocs, updateDoc } from "@firebase/firestore";
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
//==================================STATES===================================//

  const [userVotes, setUserVotes] = useState<number>(0);
  const [voted, setVoted] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<string>>([]);
  const [posts, setPosts] = useState<Array<any>>([]);

  const voteCap = 1;

//================================UPVOTE & DOWNVOTE====================================//

const handleUpVote = async () => {
  if (!voted && userVotes < voteCap && username !== post.username) {
    setUserVotes(userVotes + 1);
    setVoted(true);
    const updateField = { votes: post.votes + 1 };
    const queryRef = collection(db, "Posts");
    const q = query(queryRef, where("postId", "==", post.postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      updateDoc(doc.ref, updateField);
    });
  }
}

const handleDownVote = async () => {
  if (!voted && userVotes < voteCap && username !== post.username) {
    setUserVotes(userVotes + 1);
    setVoted(true);
    const updateField = { votes: post.votes - 1 };
    const queryRef = collection(db, "Posts");
    const q = query(queryRef, where("postId", "==", post.postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      updateDoc(doc.ref, updateField);
    });
  }
}

//==============================COMMENT POST================================//
  const handleComment = () => {

  }
//===============================DELETE POST===============================//

  const deletePost = async () => {
    const queryRef = collection(db, "Posts");
    const q = query(queryRef, where("postId", "==", post.postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      deleteDoc(doc.ref);
    });
  }

//================================EDIT POST=================================//

  const handleEdit = () => {
    //Post Owner Only
  }

//===================================JSX===================================================//

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row pt-3 pl-3 pr-3 place-items-center select-none'>
        <img className='border border-gray-dark rounded-full w-7 h-7' alt='profilepic' src={post.profilePic}></img>
        <div className='flex flex-col pl-1 w-[12rem]'>
          <div>{post.username}</div>
          <div className='text-gray'>{post.bio}</div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='ml-2 p-2 text-white bg-transparent flex-grow resize-none text-left select-none rounded-xl max-h-8' >{post.text}</div>
          {post?.image && (
            <img
            src={post?.image}
            alt="postimage"
            className='rounded-2xl max-h-[20rem] object-cover mr-2 p-1'
          />
          )}
        </div>
      </div>
      <div className='flex flex-row justify-end gap-5 pr-3 pb-1 pt-1 border-b-[1px] border-gray-dark align-middle place-items-center'>
      {username === post.username && (
        <span
        className='text-xl ease-in-out duration-700 hover:text-[#e6b11fae] text-[17px] cursor-pointer select-none'
        onClick={(e) => deletePost()}
        >
          <RiDeleteBin7Line className='text-xl'/>
        </span>
      )}
        <span
          className='text-xl ease-in-out duration-700 hover:text-[#1fd9e6ae] text-[17px] cursor-pointer select-none'
          onClick={handleComment}
          >
          <FaRegComment className='text-xl'/>
        </span>

        {loggedIn && (
          <div className='flex flex-row items-center'>
            <span className='text-[12px] pr-[4px] select-none'>{post.votes}</span>
          
            <div className='flex flex-col'>
              <span 
                className='ease-in-out duration-700 hover:text-[#41c94cae] flex flex-row cursor-pointer select-none place-items-center'
                onClick={handleUpVote}
              >
                  <BiUpArrow className='text-xl'/>
                
              </span>
              <span 
                className='ease-in-out duration-700 hover:text-[#c94141ae] flex flex-row cursor-pointer select-none place-items-center'
                onClick={handleDownVote}
              >
                  <BiDownArrow className='text-xl'/>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Post