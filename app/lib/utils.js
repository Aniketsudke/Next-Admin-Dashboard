import mongoose from "mongoose";
import React from "react";

export const connectToDB = async () => {
  //   return (
  //     <div>connectToDB</div>
  //   )
  const connection = {};

  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error(error);
  }
};
