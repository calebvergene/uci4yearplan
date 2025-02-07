import Toolbar from './components/Toolbar';
import Calendar from './components/calendar/Calendar';
import Sidebar from './components/sidebar/Sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"



export default function Home() {
  return (
    <div className=' h-screen'>
      <Toolbar />
      <ResizablePanelGroup direction="horizontal" className='min-w-[450px]'>

        <ResizablePanel defaultSize={60}>
          <Calendar />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel><Sidebar /></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
