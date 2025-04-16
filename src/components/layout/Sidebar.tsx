/* eslint-disable react-refresh/only-export-components */
import { FC, createContext, useState, useContext, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../redux/features/auth/authApi';
import { Avatar } from '@nextui-org/react';
import { useAppSelector } from '../../redux/hook';
import { TUser, useCurrentUser } from '../../redux/features/auth/authSlice';
import { TUserData } from '../../types';
import { FaHandsWash } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu';

interface SidebarContextType {
  expanded: boolean;
}

export interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  link: string;
  active: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

export const Sidebar: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data: userData } = useGetMeQuery(user?.email);
  const data = userData?.data as TUserData;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    handleResize(); // Set the initial state based on the current window size
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside className="max-h-fit h-screen">
      <nav
        className={`h-full flex flex-col bg-white border-r ${
          theme === 'dark'
            ? 'bg-opacity-5 border-r border-gray-100 border-opacity-15'
            : ''
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            onClick={() => navigate('/')}
            className={`flex items-center gap-3 border rounded-full px-2 py-1 justify-center ${
              expanded ? 'w-full' : 'hidden duration-500'
            } ${theme === 'dark' ? 'border-gray-100 border-opacity-15' : ''}`}
          >
            <FaHandsWash className="text-warning" size={35} />
            <h2 className="font-semibold text-warning text-sm md:text-xl">
              Car Wash
            </h2>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`md:p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 md:ml-2 ${
              theme === 'dark' ? 'bg-opacity-5 hover:bg-opacity-10' : ''
            }`}
          >
            {expanded ? (
              <LuChevronFirst className="text-[25px] md:text-[35px]" />
            ) : (
              <LuChevronLast className="text-[25px] md:text-[35px]" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 p-2 md:px-3">{children}</ul>
        </SidebarContext.Provider>

        <div
          className={`border-t flex p-3 ${
            theme === 'dark' ? 'border-gray-100 border-opacity-15' : ''
          }`}
        >
          <NavLink to={`dashboard/profile`}>
            <Avatar src={data?.profileImg} className="w-10 h-10 rounded-md" />
          </NavLink>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{data?.name}</h4>
              <span className="text-xs text-gray-600">{data?.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export const SidebarItem: FC<SidebarItemProps> = ({ icon, text, link }) => {
  const { expanded } = useSidebarContext();
  const { theme } = useTheme();

  return (
    <li
      className={`relative flex items-center p-1 md:py-2 md:px-3 my-1 font-medium rounded-md cursor-pointer transition-all group ${
        expanded ? 'mb-2' : 'mb-5 mt-2'
      }`}
    >
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive
            ? `text-warning border-warning border px-2 py-1 ${
                expanded ? 'rounded-md my-2' : 'rounded-full'
              } bg-warning-50`
            : `hover:bg-warning-50 text-gray-600 border px-2 py-1 ${
                expanded ? 'rounded-md my-2' : 'rounded-full'
              } hover:border-warning transition-transform-colors-opacity duration-300 ${
                theme === 'dark' ? 'border-gray-100 border-opacity-15' : ''
              }`
        }
      >
        <div
          className={`flex items-center ${
            theme === 'dark' ? 'text-gray-400' : ''
          } ${
            expanded
              ? ''
              : 'w-4 h-[20px] md:w-7 md:h-[36px] rounded-full flex items-center justify-center'
          }`}
        >
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? 'w-52 ml-3' : 'hidden'
            }`}
          >
            {text}
          </span>
        </div>
      </NavLink>
    </li>
  );
};
