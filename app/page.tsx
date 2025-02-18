import Toolbar from './components/Toolbar';
import Calendar from './components/calendar/CoursePlanner';
import Sidebar from './components/sidebar/Sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


export default function Home() {
  return (
    <div className=' h-screen overflow-hidden'>
      <Toolbar />
      <ResizablePanelGroup direction="horizontal" className='min-w-[450px]'>

        <ResizablePanel defaultSize={60}>
          <Calendar />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={40} minSize={27}><Sidebar /></ResizablePanel>
      </ResizablePanelGroup>
    </div>

  );
}
