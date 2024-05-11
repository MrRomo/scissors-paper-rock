import { Button } from "@atoms"

export const Sidebar = () => {
  return (
    <div className="w-full  h-[70vh] bg-slate-800 rounded-md py-4">
      <Button classes="px-8" text="Reset" onClick={() => console.log("Reset")} />
    </div >
  )
}