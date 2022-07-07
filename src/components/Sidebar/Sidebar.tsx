import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { BiEnvelope } from 'react-icons/bi';
import { RiCoinLine } from 'react-icons/ri';
import { GiSpikedHalo } from 'react-icons/gi';
import ConnectButton from './ConnectButton';
import { ethers } from 'ethers';

interface Props {
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  setUri: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  contract: any;
}
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

//TODO: 1. Make a ternary operation for either a Connect Button to show up if not connected or the Profile widget w/ pic if connected.

const Sidebar = ({account, setAccount, setUri, setBio, setUsername, contract}: Props) => {

    const isConnected = Boolean(account);

    const connectAccount = async () => {
      if (window.ethereum) {
          const account = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          await setAccount(account);
          setInfo();
      }          
    }

    const setInfo = async () => {
      let count = await contract.count();
      let countInt = Number(count.toString());
      console.log("Total Accounts Created: " + countInt);
      let myToken = await contract.getTokenId(String(account));
      console.log(myToken);
    }

    console.log(account);
// I want the count variable to display, so I can do a for loop to match the wallet address with the SBT Id to confirm
// 1) use the getTokenId SC function
// 2) Figure out how to assign a tokenID to a MetaMask Account -- Use the getTokenId SC function
// 3) Add IPFS Image, Bio, and Username to State and Render on Feed.tsx

    const disconnect = () => {
      setAccount('');
    }

  return (
    <div className='flex flex-col w-1/5 p-3 gap-3 border-r-[1px] border-gray-dark'>
        <div className='text-4xl font-VT323 text-center'>c0nn3ct3d</div>
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
        <div className='flex flex-row justify-center'>
            {isConnected ? (
              <div className='flex flex-col max-w-[6rem] items-center'>
                <span className='text-center text-[12px] text-gray'>Account: {account[0]}</span>
                <button className='text-sm content-center mt-1 shadow-md shadow-gray border border-gray-dark rounded-2xl pl-1 pr-1 hover:border-transparant hover:bg-[#2e2e2e] hover:shadow-inner hover:shadow-black' onClick={disconnect} >Disconnect</button>
              </div>
            ) : (
              <ConnectButton account={account} setAccount={setAccount} connectAccount={connectAccount}/>
            )}   
        </div>
    </div>
  )
}

export default Sidebar