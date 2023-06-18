import { connectToDb } from "@/utils/database";
import Products from "@/models/products";

export const GET = async (req) => {
  try {
    await connectToDb();
    const products = await Products.find({})
    console.log('call to db')
    return new Response(JSON.stringify(products), { status: 200 })

  } catch (error) {
    console.log(error)
    return new Response('Failed to fetch products', { status: 500 })
  }
}