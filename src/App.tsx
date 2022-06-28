import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Feed from './components/Feed/Feed';
import Widgets from './components/Widgets/Widgets';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
        <div className='flex flex-row bg-black text-white mb-auto' >
          <Sidebar/>
          <Feed />
          <Widgets />
        </div>
        <div className='bg-black text-white'>
          <Footer /> 
        </div>
    </>
  );
}

export default App;
