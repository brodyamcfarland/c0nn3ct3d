import React from 'react'

const Footer = () => {
  return (
    <div className='text-center flex flex-row gap-5 p-2 justify-center border-t-[1px] border-gray-dark'>
        <div>BTC Price:</div>
        <div>ETH Price:</div>
        <a className='' href='/' target='_blank'>Soulbound</a>
        <a className='' href='/' target='_blank'>Github</a>
        <a className='' href='/' target='_blank'>About</a>
    </div>
  )
}

export default Footer