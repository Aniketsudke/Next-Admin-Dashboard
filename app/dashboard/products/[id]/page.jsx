import React from 'react'
import style from '@/app/ui/users/singleUserPage.module.css'
import Image from 'next/image'
import { fetchProduct } from '@/app/lib/data';
import { updateProduct } from '@/app/lib/actions';

const SingleProductPage = async({params}) => {
    const {id} = params;
    const product = await fetchProduct(id);
  return (
    <div className={style.container}>
        <div className={style.infoContainer}>
            <div className={style.imgContainer}>
                <Image src={'/noavatar.png' || product.img}  alt = 'Profile Image' fill/>    
            </div>  
            {product.title}
        </div>    
        <div className={style.formContainer}>
        <form action={updateProduct} className={style.form}>
            <input type="hidden" value={product.id} name='id' />
            <label htmlFor="title">Title</label>
            <input type="text" name='title' placeholder={product.title} />
           
            <label htmlFor="price">Price</label>
            <input type="text" name='price' placeholder={product.price}/>
            <label htmlFor="stock">Stock</label>
            <input type="text" name='stock' placeholder={product.stock}/>
            <label htmlFor="size">Size</label>
            <input type="text" name='size' placeholder={product.size}/>
            <label htmlFor="color">Color</label>
            <input type="text" name='color' placeholder={product.color}/>
            <label htmlFor="Cat">Categories</label>
            <select name="cat" id="cat">
                <option value="Kitchen">Kitchen</option>
                <option value="Computer">Computer</option>
            </select>
            <label htmlFor="description">description</label>
            <textarea type="text" rows={"10px"} cols={"50px"} name='description' placeholder={product.desc}/>
            <button>Update</button>
            </form>
        </div>    
    </div>
  )
}

export default SingleProductPage