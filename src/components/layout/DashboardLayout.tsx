// src/components/layout/DashboardLayout.tsx
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarItem, Sidebar } from './Sidebar';
import { useAppSelector } from '../../redux/hook';
import { TUser, useCurrentUser } from '../../redux/features/auth/authSlice';
import { FaBook, FaUsers, FaUser } from 'react-icons/fa';
import { GiTargetDummy } from 'react-icons/gi';
import { SiNewrelic } from 'react-icons/si';
import { LuClipboardPaste } from 'react-icons/lu';
import BackButton from '../serviceSlots/BackButton';
import { FaCheckToSlot, FaServicestack } from 'react-icons/fa6';
import { IoAnalytics } from 'react-icons/io5';
import { MdIncompleteCircle } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';

const DashboardLayout: FC = () => {
  const { role } = useAppSelector(useCurrentUser) as TUser;

  return (
    <div className="flex h-screen max-w-7xl mx-auto">
      <Sidebar>
        {role === 'admin' && (
          <>
            <SidebarItem
              icon={<IoAnalytics className="text-[20px] md:text-[16px]" />}
              text="Dashboard"
              active={false}
              link="/dashboard/dashboard"
            />
            <SidebarItem
              icon={<ImProfile className="text-[20px] md:text-[16px]" />}
              text="Profile"
              active={false}
              link="/dashboard/profile"
            />
            <SidebarItem
              icon={<FaServicestack className="text-[20px] md:text-[16px]" />}
              text="All Services"
              active={false}
              link="/dashboard/all-services"
            />
            <SidebarItem
              icon={<FaCheckToSlot className="text-[20px] md:text-[16px]" />}
              text="All Slots"
              active={false}
              link="/dashboard/all-slots"
            />
            <SidebarItem
              icon={<GiTargetDummy className="text-[20px] md:text-[16px]" />}
              text="All Bookings"
              active={false}
              link="/dashboard/all-bookings"
            />
            <SidebarItem
              icon={<FaUser className="text-[20px] md:text-[16px]" />}
              text="All User Bookings"
              active={false}
              link="/dashboard/all-user-bookings"
            />
            <SidebarItem
              icon={<FaUsers className="text-[20px] md:text-[16px]" />}
              text="All Users"
              active={false}
              link="/dashboard/all-users"
            />
            <SidebarItem
              icon={<FaUsers className="text-[20px] md:text-[16px]" />}
              text="All Admins"
              active={false}
              link="/dashboard/all-admins"
            />
          </>
        )}
        {role === 'user' && (
          <>
            <SidebarItem
              icon={<ImProfile className="text-[20px] md:text-[16px]" />}
              text="profile"
              active={false}
              link="/dashboard/profile"
            />
            <SidebarItem
              icon={<GiTargetDummy className="text-[20px] md:text-[16px]" />}
              text="All Bookings"
              active={false}
              link="/dashboard/my-bookings"
            />
            <SidebarItem
              icon={<SiNewrelic className="text-[20px] md:text-[16px]" />}
              text="New Bookings"
              active={false}
              link="/dashboard/new-bookings"
            />
            <SidebarItem
              icon={<LuClipboardPaste className="text-[20px] md:text-[16px]" />}
              text="Past Bookings"
              active={false}
              link="/dashboard/past-bookings"
            />
            <SidebarItem
              icon={
                <MdIncompleteCircle className="text-[20px] md:text-[16px]" />
              }
              text="Complete Bookings"
              active={false}
              link="/dashboard/complete-bookings"
            />

            <SidebarItem
              icon={<LuClipboardPaste className="text-[20px] md:text-[16px]" />}
              text="Upcoming Bookings"
              active={false}
              link="/dashboard/upcoming-bookings"
            />
          </>
        )}
        <SidebarItem
          icon={<FaBook className="text-[20px] md:text-[16px]" />}
          text="Documentation"
          active={false}
          link="/dashboard/documentation"
        />
      </Sidebar>
      <div className="px-2 md:px=4 py-4 w-full overflow-y-auto">
        <div className="-mt-5">
          <BackButton />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
