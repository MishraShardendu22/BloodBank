import { FactoryIcon, GiftIcon, Home, HospitalIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  {
    id: 0,
    link: "/",
    icon: Home,
    title: "Home",
  },
  {
    id: 1,
    link: "/donor",
    icon: GiftIcon,
    title: "Donors",
  },
  {
    id: 2,
    link: "/hospital",
    icon: HospitalIcon,
    title: "Hospitals",
  },
  {
    id: 3,
    link: "/organisation",
    icon: FactoryIcon,
    title: "Organisation",
  },
];

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 p-4">
      <div className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.link}
            className={({ isActive }) =>
              `flex items-center space-x-3 
                px-4 py-3 
                rounded-lg 
                text-sm font-medium 
                transition-all duration-300 
                ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span>{link.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
