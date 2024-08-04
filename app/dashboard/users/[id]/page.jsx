import React from 'react'
import style from '@/app/ui/users/singleUserPage.module.css'
import Image from 'next/image'
import { addUser, updateUser } from '@/app/lib/actions'
import { fetchUser } from '@/app/lib/data'

const SingleUserPage = async({params}) => {
    const {id} = params;
    const user = await fetchUser(id);

  return (
    <div className={style.container}>
        <div className={style.infoContainer}>
            <div className={style.imgContainer}>
                <Image src={'/noavatar.png' || user.img}  alt = 'Profile Image' fill/>    
            </div>  
            {user.username}
        </div>    
        <div className={style.formContainer}>
        <form action={updateUser} className={style.form}>
            <input type="hidden" value={user.id} name='id' />
            <label htmlFor="username">Username</label>
            <input type="text" name='username' placeholder={user.username} />
            <label htmlFor="Email">Email</label>
            <input type="email" name='email' placeholder={user.email}/>
            <label htmlFor="Password">Password</label>
            <input type="password" name='password' placeholder='password'/>
            <label htmlFor="Phone">Phone</label>
            <input type="text" name='phone' placeholder={user.phone}/>
            <label htmlFor="address">Address</label>
            <input type="textarea" name='address' placeholder={user.address}/>
            <label htmlFor="isAdmin">Is Admin?</label>
            <select name="isAdmin" id="isAdmin">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <label htmlFor="isActive">Is Active?</label>
            <select name="isActive" id="isActive">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <button>Update</button>
            </form>
        </div>    
    </div>
  )
}

export default SingleUserPage