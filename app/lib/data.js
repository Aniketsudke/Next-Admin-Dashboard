import { revalidatePath } from "next/cache";
import { Products, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;

  try {
    await connectToDB();
    const count = await User.countDocuments({ username: { $regex: regex } });
    page = Math.max(1, parseInt(page, 10) || 1);
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, users }; // Ensure 'users' is always an array
  } catch (err) {
    console.error("Error fetching users:", err);
    return { count: 0, users: [] }; // Return empty array on error
  }
};
export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;

  try {
    await connectToDB();
    const count = await Products.countDocuments({
      title: { $regex: regex },
    });
    page = Math.max(1, parseInt(page, 10) || 1);
    const products = await Products.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, products };
  } catch (err) {
    console.error("Error fetching users:", err);
    return { count: 0, users: [] }; // Return empty array on error
  }
};

export const deleteProduct = async (formData) => {
  "use server";
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Products.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to Deleted the Product");
  }
  revalidatePath("/dashboard/product");
};
export const deleteUser = async (formData) => {
  "use server";
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to Deleted the User");
  }
  revalidatePath("/dashboard/users");
};

export const fetchUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(erro);
  }
};
export const fetchProduct = async (id) => {
  try {
    const product = await Products.findById(id);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error(erro);
  }
};
