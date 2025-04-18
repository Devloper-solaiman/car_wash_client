import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

import { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "../../theme/ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logout,
  TUser,
  useCurrentUser,
  useCurrentUserToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/VerifyToken";
import { useGetMeQuery } from "../../redux/features/auth/authApi";
import { getAllSlotBooking } from "../../redux/features/user/slotBookmarkSlice";
import { useGetAllMyBookingsQuery } from "../../redux/features/user/slotBokingApi";
import NavBarCountDown from "./NavBarCountDown";
import Logo from "../ui/Logo";
import { getAllFavoriteServices } from "../../redux/features/service/serviceSlice";
import { Heart, Menu, ShoppingBag } from "lucide-react";

const NavBar: FC = () => {
  const { email, role } = useAppSelector(useCurrentUser) || {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: userDetails } = useGetMeQuery(email);
  const { profileImg} = userDetails?.data.profileImg || ({} as TUser);
  const { name } = userDetails?.data.name || ({} as TUser);
  console.log( 'me_Data',userDetails)
  const { data: booking } = useGetAllMyBookingsQuery({ sort: "-createdAt" });
  const slotBookingData = useAppSelector(getAllSlotBooking);
  const token = useAppSelector(useCurrentUserToken);
  let user;

  const allFavoriteServices = useAppSelector(getAllFavoriteServices);

  if (token) {
    user = verifyToken(token);
  }

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/aboutUs" },
    { name: "Bookings", path: "/booking" },
    { name: "Favorite", path: "/favorites-services" },
  ].filter(Boolean);

  return (
    <Navbar
      maxWidth="xl"
      className="bg-background/60 backdrop-blur-md border-b border-divider"
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle icon={<Menu className="h-6 w-6" />} />
      </NavbarContent>

      <NavbarContent className="lg:hidden pr-3" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <nav className="hidden lg:flex gap-4 space-x-9 ml-10">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-1 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-default-500 border-b-2 border-warning"
                      : "text-foreground/60 hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </NavbarItem>
          ))}
        </nav>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Tooltip content="Recent booking slot will start">
            <NavbarItem className="hidden lg:block mt-3">
              {booking?.data?.length && role === "user" && (
                <NavBarCountDown
                  slotDates={
                    booking?.data?.[0]?.slot
                      ? [[booking.data[0].slot[0].date]]
                      : []
                  }
                />
              )}
            </NavbarItem>
          </Tooltip>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <div className="relative">
            <Button
              radius="full"
              isIconOnly
              size="md"
              variant="ghost"
              onClick={() => navigate("/favorites-services")}
              startContent={<Heart className="h-5 w-5" />}
            />
            <div className="bg-red-500 absolute top-0 right-0 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center">
              {allFavoriteServices?.length || 0}
            </div>
          </div>
        </NavbarItem>
        {role === "user" && (
          <>
            <NavbarItem>
              <div className="relative">
                <Button
                  radius="full"
                  isIconOnly
                  size="md"
                  variant="ghost"
                  onClick={() => navigate("/booking")}
                  startContent={<ShoppingBag className="h-5 w-5" />}
                />
                <div className="bg-warning-500 absolute top-0 right-0 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center">
                  {slotBookingData?.length || 0}
                </div>
              </div>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform size-7"
                  name={name}
                  src={profileImg}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{email}</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  onClick={() => navigate("/dashboard/profile")}
                >
                  My Profile
                </DropdownItem>

                <DropdownItem
                key='admin'
                  className={`${role === "admin" ? "" : "hidden"}`}
                  onClick={() => navigate("/dashboard/dashboard")}
                >
                  Dashboard
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => dispatch(logout())}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              color="warning"
              to="auth/login"
              variant="flat"
              radius="full"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="space-y-2" key={`${item.name}-${index}`}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `px-1 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-default-500 border-b-2 border-warning"
                    : "text-foreground/60 hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              {item.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <ThemeSwitcher />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
