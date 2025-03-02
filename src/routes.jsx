import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  ArrowRightOnRectangleIcon,
  ServerStackIcon, // More fitting icon for "Sign In"
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import Users from "./pages/dashboard/users";
import Message from "./pages/dashboard/message";
import { SignIn } from "@/pages/auth";

const icon = { className: "w-5 h-5 text-inherit" };

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "الصفحة الرئيسية",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "المستخدمون",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <ChatBubbleLeftIcon {...icon} />,
        name: "الرسائل",
        path: "/message",
        element: <Message />,
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "تسجيل الخروج",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
