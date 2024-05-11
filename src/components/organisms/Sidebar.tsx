import { Button } from "@atoms"
import { TableContext } from "@providers"
import { useContext } from "react"

export const Sidebar = () => {
  const { reset } = useContext(TableContext)

  return (
    <div className="w-full  h-[70vh] bg-slate-800 rounded-md py-4">
      <Button classes="px-8" text="Reset" onClick={() => reset()} />
    </div >
  )
}