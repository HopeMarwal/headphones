import { connectToDb } from "@/utils/database"
import Cart from "@/models/cart";

// Get user cart with products data 
export const GET = async (req, { params }) => {
  console.log(params)
  try {
    await connectToDb();
    const cartItems = await Cart.findOne({user: params.id}).populate('products.product_id')
    console.log(cartItems)
    return new Response(JSON.stringify(cartItems), { status: 200 })

  } catch (error) {
    console.log(error)
    return new Response('Failed to fetch cart items', { status: 500 })
  }
}
