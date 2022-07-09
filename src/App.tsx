import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Feed from './components/Feed/Feed';
import Widgets from './components/Widgets/Widgets';
import Footer from './components/Footer/Footer';
import { ethers } from 'ethers';
import { useState } from 'react';

//======================================CONTRACT CONNECTION============================================================================//
//====Provider - Read Access=====Signer - Read/Write Access=========//
const INFURA_ID = process.env.REACT_APP_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`);

const ABI = [
  "function issue(address _issuee, string calldata _uri, string calldata username, string calldata bio) external",
  "function _mint(address to, uint256 tokenId, string calldata uri, string calldata username, string calldata bio) returns (uint256)",
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
  "function tokenUsernames(uint256 tokenId) public view returns (string memory)",
  "function tokenBio(uint256 tokenId) public view returns (string memory)",
  "function count() public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function getTokenId(address) public view returns (uint)",
]

const address = '0xeB1571e421c55cCB15bdE06FCC7c7A6A886414Ef'; //Soulbound SC Address v3

const contract = new ethers.Contract(address, ABI, provider);

const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  // const tokenURI = await contract.tokenURI(1);
  // const tokenUsernames = await contract.tokenUsernames(1);
  // const tokenBio = await contract.tokenBio(1);
  console.log(`\nSmart Contract Connected: ${address}`);
  console.log(`\nName: ${name}`);
  console.log(`\nSymbol: ${symbol}`);
  // console.log(`\nToken URI [TokenId: 1]: ${tokenURI}`);
  // console.log(`\nToken Username [TokenId: 1]: ${tokenUsernames}`);
  // console.log(`\nToken Bio [TokenId: 1]: ${tokenBio}`);
};

main();
//======================================CONTRACT CONNECTION END==========================================================================//

function App() {
//========GLOBAL STATES=========//

  const [account, setAccount] = useState<null | string>(null);
  const [postText, setPostText] = useState<string>('');
  const [postPhoto, setPostPhoto] = useState<File[]>([]);
  const [bio, setBio] = useState<string>(''); //Read from Smart Contract after Connecting
  const [uri, setUri] = useState<string>(''); //Read from Smart Contract after Connecting
  const [username, setUsername] = useState<string>(''); //Read from Smart Contract after Connecting
  const [tokenId, setTokenId] = useState<number>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  
//=========STATE END===========//
  return (
    <>
      <div className='flex flex-col min-h-screen'>
          <div className='flex flex-row bg-black text-white mb-auto flex-grow' >
            <Sidebar
              account={account}
              setAccount={setAccount}
              setBio={setBio}
              setUri={setUri}
              setUsername={setUsername}
              contract={contract}
              tokenId={tokenId}
              setTokenId={setTokenId}
              setLoggedIn={setLoggedIn}
              />            
            <Feed
              account={account}
              postText={postText}
              setPostText={setPostText}
              postPhoto={postPhoto}
              setPostPhoto={setPostPhoto}
              username={username}
              uri={uri}
              bio={bio}
              loggedIn={loggedIn}
              />
            <Widgets
              contract={contract}
              />
          </div>
          <div className='bg-black text-white'>
            <Footer /> 
          </div>
      </div>
    </>
  );
}

export default App;
