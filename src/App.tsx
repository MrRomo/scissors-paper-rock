import { Setbar, Sidebar, Table } from '@organisms'
import './App.css'
import { TableProvider } from './providers/TableProvider'

function App() {
  return (
    <TableProvider>
      <div className="w-full h-full md:p-8 gap-4 flex flex-col">
        <Setbar />
        <div className="grid grid-cols-6 gap-2">
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
