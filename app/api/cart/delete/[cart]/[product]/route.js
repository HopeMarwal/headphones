import { connectToDb } from "@/utils/database"
import Cart from "@/models/cart";

//DELETE (delete)
export const DELETE = async (req, { params } ) => {
  console.log('call delete')
  console.log(params)
  try {
    await connectToDb();
    //get prompt by id
    const existingCart = await Cart.findById(params.cart)
    console.log(existingCart)

    
    existingCart.products.remove({ product_id: params.product})
    
    await existingCart.save()
    return new Response('CartItem deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete the cart item', { status: 500 })
  }
}