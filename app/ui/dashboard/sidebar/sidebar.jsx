import React from 'react'
import style from './sidebar.module.css';
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';
import { auth, signOut } from '@/app/auth';


const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async() => {
  const {user} = await auth();
  console.log(user)
  return (
    <div className={style.container}
    >
      <div className={style.user}>
        <Image className={style.userImage} src='/noavatar.png'  alt = 'Profile Image' width='50' height='50'/>
        <div className={style.userDetail}>
          <span className={style.username}>{user.username}</span>
          <span className={style.userRole}>Role of User</span>
        </div>
      </div>
     <ul className={style.list}>
      {
        menuItems.map((cat)=>(
          <li key={cat.title}>
            <span className={style.cat}>{cat.title}</span>
            {
              cat.list.map(item=>(
                <MenuLink item={item} key={item.title}/>
              ))
            }
            </li>
        ))
      }
      </ul> 
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={style.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
      
      </div>
  )
}

export default Sidebar