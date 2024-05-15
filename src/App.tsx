import { Setbar, Sidebar, Table } from '@organisms'
import './App.css'
import { TableProvider } from './providers/TableProvider'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <TableProvider>
      <div className="w-full h-full p-1 md:p-4 gap-4 flex flex-col rounded-lg">
        <Setbar />
        <div className=" flex md:flex-col md:grid grid-cols-6 gap-2 flex-col-reverse">
          <div className='col-span-1'>
            <Sidebar />
          </div>
          <div className='col-span-5'>
            <Table />
          </div>
        </div>
      </div>
      <Analytics />
    </TableProvider>
  )
}

export default App
