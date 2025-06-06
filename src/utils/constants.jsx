import {
    BsFillImageFill,
    BsReverseLayoutTextSidebarReverse,
    BsPerson,
} from "react-icons/bs";
import { PiInvoiceFill } from "react-icons/pi";
import {
    AiOutlineBarChart,
    AiOutlineFileText,
    AiOutlineMail,
    AiOutlineSetting,
    AiOutlineLogout,
} from "react-icons/ai";

import { RiDashboardFill } from "react-icons/ri";

export const Menus = [
    {
        title: "Dashboard",
        icon: <RiDashboardFill />
    },
    {
        title: "Lr Copies",
        icon: <AiOutlineFileText />
    },
    {
        title: "Media",
        spacing: true,
        icon: <BsFillImageFill />
    },
    {
        title: "Reports",
        icon: <BsReverseLayoutTextSidebarReverse />,
        submenu: true,
        submenuItems: [
            {
                title: "Submenu 1"
            },
            {
                title: "Submenu 2"
            },
            {
                title: "Submenu 3"
            }
        ]
    },
    {
        title: "Analytics",
        icon: <AiOutlineBarChart />
    },
    {
        title: "Invoice",
        icon: <PiInvoiceFill />,
        navigateUrl:"viewinvoice"
    },
    {
        title: "Profile",
        spacing: true,
        icon: <BsPerson />
    },
    {
        title: "Settings",
        icon: <AiOutlineSetting />
    },
    {
        title: "Logout",
        icon: <AiOutlineLogout />
    },
];

export const url="http://localhost:8000"

// export const 