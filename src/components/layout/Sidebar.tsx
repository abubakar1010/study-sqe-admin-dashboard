import { Home, Settings, ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import logo from "../../assets/images/logo.png";

import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaQuestion, FaUser } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { BsFillStickyFill, BsQuestionSquareFill } from "react-icons/bs";
import { TbCardsFilled } from "react-icons/tb";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth() as any;

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeParent, setActiveParent] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menus = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "All Users", icon: <FaUser size={20} />, path: "/all-users" },
    {
      name: "Tutorials",
      icon: <MdOndemandVideo size={20} />,
      path: "/tutorials",
    },

    {
      name: "Questions",
      icon: <BsQuestionSquareFill />,
      path: "/subject",
      subMenus: [
        { name: "FLK1", path: "/subject/MCQ/FLK1" },
        { name: "FLK2", path: "/subject/MCQ/FLK2" },
        { name: "Ethics & Conduct", path: "/subject/MCQ/E_AND_C" },
      ],
    },

    {
      name: "Flashcards",
      icon: <TbCardsFilled />,
      path: "/flashcards",
      subMenus: [
        { name: "FLK1", path: "/subject/FLASHCARD/FLK1" },
        { name: "FLK2", path: "/subject/FLASHCARD/FLK2" },
        { name: "Ethics & Conduct", path: "/subject/FLASHCARD/E_AND_C" },
      ],
    },

    {
      name: "Notes",
      icon: <BsFillStickyFill />,
      path: "/notes",
      subMenus: [
        { name: "FLK1", path: "/subject/NOTE/FLK1" },
        { name: "FLK2", path: "/subject/NOTE/FLK2" },
      ],
    },

    { name: "Earnings", icon: <RiMoneyDollarCircleFill />, path: "/earnings" },
    { name: "Help Center", icon: <BiSupport />, path: "/help" },
    { name: "FAQ", icon: <FaQuestion />, path: "/faq" },

    {
      name: "Profile",
      icon: <CiUser />,
      path: "/profile",
      subMenus: [
        { name: "Update Profile", path: "/profile" },
        { name: "Change Password", path: "/change-password" },
      ],
    },

    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
      subMenus: [
        { name: "About", path: "/settings/about" },
        { name: "Terms and Conditions", path: "/settings/terms" },
        { name: "Privacy Policy", path: "/settings/privacy" },
      ],
    },
  ];

  const handleToggle = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
    setActiveParent(menuName);
    setActiveSub(null);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-[#977275] text-white rounded-md"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-accent shadow-md p-4 flex flex-col space-y-4 transition-transform duration-300 z-40
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-center mt-10 md:mt-0">
          <img className="w-3/4 rounded-xl" src={logo} alt="Logo" />
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menus.map((menu, i) => {
            const isParentActive =
              activeParent === menu.name || location.pathname === menu.path;

            return menu.subMenus ? (
              <div key={i}>
                {/* Parent */}
                <button
                  onClick={() => handleToggle(menu.name)}
                  className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl transition
                    ${
                      isParentActive
                        ? "bg-[#977275] text-white"
                        : "text-gray-100 hover:bg-blue-100 hover:text-accent"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    {menu.icon}
                    {menu.name}
                  </span>
                  {openMenu === menu.name ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Submenus */}
                {openMenu === menu.name && (
                  <div className="ml-6 mt-2 flex flex-col gap-2">
                    {menu.subMenus.map((sub) => {
                      const isActive = activeSub === sub.path;

                      return (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`p-2 rounded-md text-sm transition
                            ${
                              isActive
                                ? "bg-[#977275] text-white"
                                : "bg-slate-50 text-accent hover:bg-blue-50 hover:text-blue-600"
                            }`}
                          onClick={() => {
                            setIsMobileOpen(false);
                            setActiveParent(menu.name);
                            setActiveSub(sub.path);
                            setOpenMenu(menu.name);
                          }}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={menu.path}
                to={menu.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition
                  ${
                    location.pathname === menu.path
                      ? "bg-[#977275] text-white"
                      : "text-gray-300 hover:bg-blue-100 hover:text-accent"
                  }`}
                onClick={() => {
                  setIsMobileOpen(false);
                  setActiveParent(menu.name);
                  setActiveSub(null);
                  setOpenMenu(null);
                }}
              >
                {menu.icon}
                {menu.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            setIsMobileOpen(false);
          }}
          className="bg-[#AD1E25] rounded-md w-full flex items-center gap-3 p-3 text-white"
        >
          Logout
        </button>
      </aside>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
