"use client"
import Link from 'next/link'
import React from 'react'
import style from './menuLink.module.css'
import { usePathname } from 'next/navigation'
const MenuLink = ({item}) => {
    const path = usePathname()
  return (
    <Link href={item.path} className={`${style.container} ${path == item.path && style.active}`} >
        {item.icon}
        {item.title}
    </Link>
  )
}

export default MenuLink