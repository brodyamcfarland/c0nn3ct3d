import { useState } from 'react'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { collection, deleteDoc, query, where, getDocs, updateDoc, addDoc, serverTimestamp } from "@firebase/firestore";
import {db} from '../../backend/Firebase';

interface Props {
    loggedIn: boolean;
    post: any;
    username: string;
    bio: string;
    uri: string;
  }

const Comment = ({loggedIn, post, username, bio, uri}: Props) => {

//==================================STATES===================================//

    const [userCommentVotes, setUserCommentVotes] = useState<number>(0);
    const [voted, setVoted] = useState<boolean>(false);

    const voteCap = 1;

//================================UPVOTE & DOWNVOTE====================================//

    const handleUpVote = async () => {
        if (!voted && userCommentVotes < voteCap) {
        setUserCommentVotes(userCommentVotes + 1);
        setVoted(true);
        const updateField = { votes: post.votes + 1 };
        const queryRef = collection(db, "Comments");
        const q = query(queryRef, where("parentId", "==", post.postId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            updateDoc(doc.ref, updateField);
        });
        }
    }
  
  const handleDownVote = async () => {
    if (!voted && userCommentVotes < voteCap) {
      setUserCommentVotes(userCommentVotes + 1);
      setVoted(true);
      const updateField = { votes: post.votes - 1 };
      const queryRef = collection(db, "Comments");
      const q = query(queryRef, where("parentId", "==", post.postId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        updateDoc(doc.ref, updateField);
      });
    }
  }
//==============================REPLY TO COMMENT================================//
const handleReply = () => {
    console.log("Bababoi");

  }
//===============================DELETE COMMENT===============================//
const deleteComment = async () => {
    const queryRef = collection(db, "Comments");
    const q = query(queryRef, where("parentId", "==", post.postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      deleteDoc(doc.ref);
    });
  }
//============================================================================//

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row pt-3 pl-3 pr-3 place-items-center select-none'>
        <img className='border border-gray-dark rounded-full w-7 h-7' alt='profilepic' src={post.profilePic}></img>
        <div className='flex flex-col pl-1 w-[12rem]'>
          <div>{post.username}</div>
          <div className='text-gray'>{post.bio}</div>
          <div className='text-gray text-[12px]'></div>
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
      {post.username && (
        <span
        className='text-xl ease-in-out duration-700 hover:text-[#e6b11fae] text-[17px] cursor-pointer select-none'
        onClick={(e) => deleteComment()}
        >
          <RiDeleteBin7Line className='text-xl'/>
        </span>
      )}
        <span
          className='text-xl ease-in-out duration-700 hover:text-[#1fd9e6ae] text-[17px] cursor-pointer select-none'
          onClick={handleReply}
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

export default Comment;