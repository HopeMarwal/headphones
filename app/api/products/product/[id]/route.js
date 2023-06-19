import { connectToDb } from "@/utils/database";
import Products from "@/models/products";

//Get single product by request id
export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const existingProduct = await Products.findById(params.id)
    return new Response(JSON.stringify(existingProduct), { status: 200 })

  } catch (error) {
    console.log(error)
    return new Response('Failed to fetch products', { status: 500 })
  }
}