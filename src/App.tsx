import './App.css'
import { Table } from './components/organisms'
import { SetBar } from './components/organisms/SetBar'
import { TableProvider } from './providers/TableProvider'

function App() {
  return (
    <TableProvider>
      <div className="w-full h-full md:p-8 gap-4 flex flex-col">
        <SetBar />
        <Table />
      </div>
    </TableProvider>
  )
}

export default App
