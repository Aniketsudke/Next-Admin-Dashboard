import React from 'react'
import style from '../../ui/users/users.module.css'
import Search from '@/app/ui/dashboard/search/search'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import { deleteUser, fetchUsers } from '@/app/lib/data'
const UsersPage = async({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || "1"; // Default to page 1 if not provided

  // Fetch users data
  const { count, users } = await fetchUsers(q, page);

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Ensure 'users' is an array
  const userList = Array.isArray(users) ? users : [];
  // console.log(users);
  return (
    <div className={style.container}>
      <div className={style.top}>
        <Search placeholder = "Search for Users"/>
        <Link href={'/dashboard/users/add'}>
        <button className={style.addButton}>Add User</button>
        </Link>
      </div>
      <table className={style.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user1)=>{
               return( <tr key={user1._id}>
                <td>
                  <div className={style.user}>
                    <Image src={user1.img || '/noavatar.png'} alt='User Profile' width={40} height={40} className={style.userImage}/>
                    {user1.username}
                  </div>
                </td>
                <td>{user1.email}</td>
                <td>{formatDate(user1.createdAt)}</td>
                <td>{user1.isAdmin?"Admin":"Client"}</td>
                <td>{user1.isActive?"Active":"Passive"}</td>
                <td>
                  <div className={style.buttons}>
                  <Link href={`users/${user1._id}`} >
                    <button  className={`${style.button} ${style.view}`}>View</button>
                  </Link>
                  <form action={deleteUser} >
                    <input type="hidden" name="id" value={user1.id} />
                    <button className={`${style.button} ${style.delete}`}>Delete</button>
                  </form>
                  </div>
                </td>
              </tr>)
              })
            }
           
          </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  )
}

export default UsersPage



// If database Image is not work then check Github profile