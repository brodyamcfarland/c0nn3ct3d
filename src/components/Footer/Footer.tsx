import BTC from '../../../node_modules/cryptocurrency-icons/32/color/btc.png';
import ETH from '../../../node_modules/cryptocurrency-icons/32/color/eth.png';
import { useState, useEffect } from 'react';
import { Coins } from './CoinInterface';
import axios, { AxiosResponse } from 'axios';

const Footer : React.FC = () => {

  const [coins, setCoins] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [FearGreed, setFearGreed] = useState<any>([]);

  function loadFear() {
    fetch('https://api.alternative.me/fng/')
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data[0]);
        setFearGreed(json.data[0]);
        console.log("Fear and Greed Loaded.");
      })
  }
//====================USE EFFECTS=======================//
  useEffect(() => {
    axios
      .get<Coins[]>('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd%2Cusd&include_market_cap=true&include_24hr_change=true&include_last_updated_at=true')
      .then((response: AxiosResponse) => {
        setCoins(response.data);       
        setLoading(false);
      }) 
  },[]);
  
  useEffect(() => {
    loadFear()
  },[]);

  if (loading) return <h1 className='text-center flex flex-row p-2 justify-center border-t-[1px] border-gray-dark'> Loading... </h1>;

  // console.log('BTC & ETH Price Loaded...' + coins);
  let btcdaily = Math.round(coins.bitcoin.usd_24h_change);
  let ethdaily = Math.round(coins.ethereum.usd_24h_change);

  return (
    <>
      <div className='fixed bottom-[0px] min-w-full text-center flex flex-row gap-5 p-2 justify-center border-[1px] border-gray-dark items-center bg-black sm:scale-75 md:scale-75 lg:scale-90 xl:scale-100 xxl:scale-100'>
          <span className='flex flex-row select-none'>
            <img className='pr-1 object-contain' src={BTC} alt='btcprice'/>
            <span className='pt-[5px] text-gray'>$ {coins.bitcoin.usd}</span>
            <span className='text-sm pl-1 text-[#5e5e5e]'>{btcdaily}%</span>
          </span>
          <span className='flex flex-row select-none'>
            <img className='pr-1 object-contain' src={ETH} alt='ethprice'/>
            <span className='pt-[5px] text-gray'>$ {coins.ethereum.usd}</span>
            <span className='text-sm pl-1 text-[#5e5e5e]'>{ethdaily}%</span>
          </span>
          <span className='flex flex-col text-sm'>
            <span className='text-[12px]'>Sentiment: {FearGreed.value}/100</span>
            <span className='text-[12px] text-gray'>{FearGreed.value_classification}</span>
          </span>
          <a className='select-none text-gray hover:text-white' href='https://brodyamcfarland.github.io/Soulbound/' target='_blank' rel="noreferrer">Soulbound</a>
          <a className='select-none text-gray hover:text-white' href='https://github.com/brodyamcfarland' target='_blank' rel="noreferrer">Github</a>
      </div>
    </>
  )
}

export default Footer;
