import React, {useEffect} from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { BiEnvelope } from 'react-icons/bi';
import { AiOutlineGithub } from 'react-icons/ai';
import { GiSpikedHalo } from 'react-icons/gi';
import ConnectButton from './ConnectButton';
import { useState } from 'react';
import DigiRain from '../../images/DigiRain.gif';

interface Props {
  account: null | string;
  setAccount: React.Dispatch<React.SetStateAction<null | string>>;
  setUri: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  contract: any;
  tokenId: number | undefined;
  setTokenId: React.Dispatch<React.SetStateAction<number | undefined>>;
  username: string;
  bio: string;
  uri: string;
  loggedIn: boolean;
}
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const Sidebar = ({account, setAccount, setUri, setBio, setUsername, contract, tokenId, setTokenId, setLoggedIn, username, bio, uri, loggedIn}: Props) => {
//=====================STATES===========================================//  
    const [loginLoading, setLoginLoading] = useState<boolean>(false);

//=====================METAMASK CONNECTION==============================// 
    const isConnected = Boolean(account);

    const connectAccount = async () => {
      if (window.ethereum) {
          const metaMask = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          setAccount(metaMask);
      }          
    }

    const disconnect = () => {
      setAccount(null);
      setLoggedIn(false);
    }

//==================LOAD ALL PROFILE DATA AFTER WALLET IS CONNECTED===================//
    const loadUserData = async () => {
      setLoginLoading(true);
      let stringAccount = String(account)
      let myToken = await contract.getTokenId(stringAccount);
      let myTokenToNumber = Number(myToken);
      setTokenId(myTokenToNumber);
      console.log("My Token ID = " + myTokenToNumber);
      setLoginLoading(false);
      let myUri = await contract.tokenURI(myToken);
      const moddedUri = myUri.replace("ipfs://", "https://ipfs.io/ipfs/");
      setUri(moddedUri);
      console.log("URI = " + moddedUri);
      let myUsername = await contract.tokenUsernames(myToken);
      setUsername(myUsername);
      console.log("Username = " + myUsername);
      let myBio = await contract.tokenBio(myToken);
      setBio(myBio);
      console.log("Bio = " + myBio);
      if (myBio.length > 0 && myUri.length > 0 && myUsername.length > 0) {
        setLoggedIn(true);
      }
    }

    useEffect(() => {
      if(account != null)
        loadUserData();
    },[account]);
//====================================END======================================//
 
  return (
    <div className='flex flex-row xxl:flex-col xl:flex-col xxl:w-1/5 xl:w-1/5 xxl:p-3 xl:p-3 xxl:gap-3 xl:gap-3 border-gray-dark
                    xsm:max-h-[5rem] xsm:pr-0 xsm:pl-000 xsm:p-1 xsm:justify-between xsm:border-b-[1px]
                    sm:max-h-8 sm:pr-10 sm:pl-10 sm:p-2 sm:justify-between sm:border-b-[1px]
                    md:max-h-8 md:pr-6 md:pl-6 md:p-1 xl:border-none'>
        <div className='text-center items-center justify-center'>
          <span className='text-4xl font-VT323 text-center select-none'>c0nn3ct3d</span>
          <span className='text-[#eb6161] m-1 bg-[#0c0c0c] p-1 font-VT323 rounded-lg select-none border border-gray-dark text-sm'>BETA</span>
        </div>
        <img className='xsm:hidden md:block rounded-full opacity-80 max-h-[25rem] object-cover' src={DigiRain}/>
        <a className='xsm:hidden xxl:flex xl:flex flex-row border border-gray-dark p-2 rounded-2xl items-center ease-in duration-200 select-none cursor-pointer hover:bg-[#0E1111] hover:border-white' href='https://github.com/brodyamcfarland/c0nn3ct3d' target='_blank' rel="noreferrer"><AiOutlineGithub className='mr-2 text-2xl'/> Github</a>
        <a className='xsm:hidden xxl:flex xl:flex flex flex-row border border-gray-dark p-2 rounded-2xl items-center ease-in duration-200 select-none cursor-pointer hover:bg-[#0E1111] hover:border-white' href='hhttps://brodyamcfarland.github.io/Soulbound/' target='_blank' rel="noreferrer"><GiSpikedHalo className='mr-2 text-2xl'/> Soulbound</a>
        <div className='flex flex-row justify-center'>
            {isConnected ? (
              <div className='flex flex-row max-w-[6rem] items-center
                              xxl:flex-col xl:flex-col xsm:flex-col'>
                <span className='xsm:hidden md:hidden xl:block text-center select-none text-[12px] text-gray'>Account: {account}</span>
                <button className='text-sm content-center mt-1 shadow-md shadow-gray border border-gray-dark rounded-2xl pl-1 select-none pr-1 hover:border-transparant hover:bg-[#2e2e2e] hover:shadow-inner hover:shadow-black' onClick={disconnect} >Disconnect</button>
                {loggedIn && account ? (
                  <span className='text-[#58eb89] text-center select-none text-[12px] pt-1'>SOUL ID: {tokenId}</span>
                ):(
                  <div>
                    {loginLoading && 
                    <div className='text-[#dd4a4a] text-center select-none text-[12px] pt-2'>Verifying Token...</div>}
                    {tokenId === 0 &&
                    <div className='text-[#dd4a4a] text-center select-none text-[12px] w-11 pt-1'>No Token Found.</div>
                    }
                  </div>
                )}
              </div>
            ) : (
              <ConnectButton
                account={account}
                setAccount={setAccount}
                connectAccount={connectAccount}
              />
            )}   
        </div>
    </div>
  )
}

export default Sidebar