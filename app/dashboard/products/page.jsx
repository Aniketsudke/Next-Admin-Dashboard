
import React from 'react'
import style from '@/app/ui/products/product.module.css'
import Search from '@/app/ui/dashboard/search/search'
import Link from 'next/link'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import Image from 'next/image'
import { deleteProduct, fetchProducts } from '@/app/lib/data'

const Products = async({searchParams}) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || "1"; // Default to page 1 if not provided

  const { count, products } = await fetchProducts(q, page);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className={style.container}>
      <div className={style.top}>
        <Search placeholder = "Search for Products"/>
        <Link href={'/dashboard/products/add'}>
        <button className={style.addButton}>Add Product</button>
        </Link>
      </div>
      <table className={style.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Stack</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
             
              products.map((product)=>{
                return(
                  <tr>
              <td>
                <div className={style.user}>
                  <Image src={'/noproduct.jpg' || product.img} alt='User Profile' width={40} height={40} className={style.userImage}/>
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>{product.price}</td>
              <td>{formatDate(product.createdAt)}</td>
              <td>{product.stock}</td>
              <td >
              <div className={style.buttons}>
                <Link href={`/dashboard/products/${product._id}`}>
                  <button className={`${style.button} ${style.view}`}>View</button>
                </Link>
                
                <form action={deleteProduct} >
                  <input type="hidden" name='id' value={product.id} />
                  <button className={`${style.button} ${style.delete}`}>Delete</button>
                </form>
                </div>
              </td>
            </tr>
                )
              })
            }
            
          </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  )
}

export default Products