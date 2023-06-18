import { connectToDb } from "@/utils/database"
import Cart from "@/models/cart";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const cartItems = await Cart.find({user: params.id}).populate('products.product_id')
    console.log('call to db')
    return new Response(JSON.stringify(cartItems), { status: 200 })

  } catch (error) {
    console.log(error)
    return new Response('Failed to fetch prompts', { status: 500 })
  }
}
