import React from 'react'

interface Props{
  account: null | string;
  setAccount: React.Dispatch<React.SetStateAction<null | string>>;
  connectAccount: any;   
};

const ConnectButton = ({ account, setAccount, connectAccount }: Props) => {
  return (
    <button
      className='shadow-md shadow-gray border border-gray-dark rounded-2xl p-2 
      hover:border-transparant hover:bg-[#cc4c4c] hover:shadow-inner hover:shadow-black' 
      onClick={connectAccount}
    >
    Connect
    </button>
  )
}

export default ConnectButton;