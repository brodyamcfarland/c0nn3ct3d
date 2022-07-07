import BTC from '../../../node_modules/cryptocurrency-icons/32/color/btc.png';
import ETH from '../../../node_modules/cryptocurrency-icons/32/color/eth.png';
import { useState, useEffect } from 'react';
import { Coins } from './CoinInterface';
import axios, { AxiosResponse } from 'axios';

//TODO 1) Fix setCoins type from any to <Coins[]> and get the interface right.

const Footer : React.FC = () => {

  const [coins, setCoins] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Coins[]>('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd%2Cusd&include_market_cap=true&include_24hr_change=true&include_last_updated_at=true')
      .then((response: AxiosResponse) => {
        console.clear();
        // console.log('Response: ', response.data);
        setCoins(response.data);       
        setLoading(false);
      }) 
  },[]);
  
  if (loading) return <h1 className='text-center flex flex-row p-2 justify-center border-t-[1px] border-gray-dark'> Loading... </h1>;

  // console.log('BTC & ETH Price Loaded...' + coins);
  let btcdaily = Math.round(coins.bitcoin.usd_24h_change);
  let ethdaily = Math.round(coins.ethereum.usd_24h_change);

  return (
    <>
      <div className='text-center flex flex-row gap-5 p-2 justify-center border-t-[1px] border-gray-dark items-center'>
          <span className='flex flex-row'>
            <img className='pr-1' src={BTC} alt='btcprice'/>
            <span className='pt-[5px] text-gray'>$ {coins.bitcoin.usd}</span>
            <span className='text-sm pl-1 text-[#5e5e5e]'>{btcdaily}%</span>
          </span>
          <span className='flex flex-row'>
            <img className='pr-1' src={ETH} alt='ethprice'/>
            <span className='pt-[5px] text-gray'>$ {coins.ethereum.usd}</span>
            <span className='text-sm pl-1 text-[#5e5e5e]'>{ethdaily}%</span>
          </span>
          <a className='text-gray hover:text-white' href='https://brodyamcfarland.github.io/Soulbound/' target='_blank' rel="noreferrer">Soulbound</a>
          <a className='text-gray hover:text-white' href='https://github.com/brodyamcfarland' target='_blank' rel="noreferrer">Github</a>
          <a className='text-gray hover:text-white' href='/' target='_blank' rel="noreferrer">About</a>
      </div>
    </>
  )
}

export default Footer;
