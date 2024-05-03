import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaRegRectangleList} from "react-icons/fa6";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
          !sidebarOpen ||
          sidebar.current.contains(target) ||
          trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
      <aside
          ref={sidebar}
          className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="pl-15 flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 flex gap-x-1 logo">
          <NavLink to="/">
            <img src="/logo.svg" alt="Logo" />
          </NavLink>
          <button
              ref={trigger}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              className="block lg:hidden"
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            {/* <!-- Menu Group --> */}
            <div>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                MENU
              </h3>
              <ul className="mb-6 flex flex-col gap-1.5">
                {/* <!-- Menu Item Dashboard --> */}
                <li>
                  <NavLink
                      to="/admin"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === '/admin' &&
                          'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                      to="/adminuser"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === '/adminuser' &&
                          'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-users" />
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                      to="/approve-challenges"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === '/approve-challenges' &&
                          'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <FaRegRectangleList/>
                    Challenges
                  </NavLink>
                </li>
                {/* <!-- Menu Item Calendar --> */}
                {/* <!-- Menu Item Profile --> */}
                <li>
                  <NavLink
                      to="/profileadmin"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === 'profile' && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                    Admin Profile
                  </NavLink>
                </li>
                {/* <!-- Menu Item Tables --> */}
                <li>
                  <NavLink
                      to="/crm"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === '/crm' && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                    Edit CRM
                  </NavLink>
                </li>
                {/* <!-- Menu Item Settings --> */}
                <li>
                  <NavLink
                      to="/settings"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('settings') &&
                          'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-gear" />
                    Settings
                  </NavLink>
                </li>
                {/* <!-- Menu Item Settings --> */}
              </ul>
            </div>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
  );
};

export default Sidebar;
