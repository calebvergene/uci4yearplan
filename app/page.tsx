import Toolbar from './components/Toolbar';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className=' h-screen'> 
        <Toolbar/>
        <div className='flex'>
          <div className='w-[60%] border-r'> <Calendar/> </div>
          <div className='w-[40%]'> <Sidebar/> </div>

        </div>
    </div>
  );
}
