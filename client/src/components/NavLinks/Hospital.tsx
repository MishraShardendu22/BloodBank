import Navbar from "../Navbar"
import { Sidebar } from "../ui/sidebar"

const Hospital = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar  />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar  />
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          
        </div>
      </div>
    </div>
  )
}

export default Hospital
