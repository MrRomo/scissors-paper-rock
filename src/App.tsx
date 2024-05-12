import { Setbar, Sidebar, Table } from '@organisms'
import './App.css'
import { TableProvider } from './providers/TableProvider'

function App() {
  return (
    <TableProvider>
      <div className="w-full h-full md:p-1 gap-4 flex flex-col">
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
    </TableProvider>
  )
}

export default App
