import React, { useState } from 'react';
// import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect } from 'react';

interface Props {
  contract: any;
}

const Widgets = ({contract}: Props) => {

  const [count, setCount]=useState<number|null>(null);

  const numberOfAccounts = async () => {
    let totalAccounts = await contract.count();
    const totalAccts = Number(totalAccounts);
    setCount(totalAccts);
  }

  useEffect(() => {
    numberOfAccounts();
  }, []);

  return (
    <div className='
      xxl:flex xxl:flex-col xxl:w-1/5 xxl:p-3
      xl:flex xl:flex-col xl:w-1/5 xl:p-3
      hidden
    '>
        {/* <form className='flex flex-row select-none'>
          <button className='border border-gray-dark rounded-full pl-1 pr-1 pt-1 pb-1 mr-1 items-center select-none ease-in duration-200 hover:bg-gray-dark'><AiOutlineSearch/></button>
          <input className='text-white bg-transparent flex-grow ease-in pl-2 duration-200 resize-none border border-gray-dark rounded-2xl scrollbar-hide overflow-y-none max-h-8 hover:bg-blackish' placeholder='Search...'></input>
        </form> */}
        <div className='bg-blackish border border-gray-dark rounded-2xl p-2 mt-2'>
          <p className='text-center'>How to Create An Account</p>
          <p className='text-gray pt-2'>Visit the <a rel="noreferrer" className='text-white hover:text-gray' target='_blank' href='https://brodyamcfarland.github.io/Soulbound/'>"Soulbound"</a> app and follow the steps to create your Soulbound Token. SBT's can be burned at any time.</p>
          <p className='text-gray text-sm pt-2'><a className='underline'>Note</a>: Make sure you are connected to Rinkeby Ethereum Test Network</p>
        </div>
        <div className='bg-blackish border border-gray-dark rounded-2xl p-2 mt-2'>
          <p className='text-center'>The Rules</p>
          <p className='text-gray pt-2'>1) All posts can be deleted by the owner of the post.</p>
          <p className='text-gray pt-2'>2) You may upvote or downvote any post besides your own.</p>
          <p className='text-gray pt-2'>3) Commenting will be disabled during beta.</p>
          <p className='text-gray pt-2'>4) Posts will remain in chronological order.</p>
          <p className='text-gray pt-2'>5) Be nice.</p>
          <p className='text-gray pt-2 text-center'>Total c0nn3ct3d Accounts:<span className='text-white'> {count}</span></p>
        </div>
        <div className='text-sm text-center pt-1'>	&copy; 2022 c0nn3ct3d</div>
    </div>
  )
}

export default Widgets;