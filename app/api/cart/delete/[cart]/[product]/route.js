import { connectToDb } from "@/utils/database"
import Cart from "@/models/cart";

//DELETE 
export const DELETE = async (req, { params } ) => {
  try {
    await connectToDb();
    // Get cart by Id
    const existingCart = await Cart.findById(params.cart)
    // Delete product item from collection
    existingCart.products.remove({ product_id: params.product})
    // Save changes
    await existingCart.save()

    return new Response('CartItem deleted successfully', { status: 200 })

  } catch (error) {
    return new Response('Failed to delete the cart item', { status: 500 })
  }
}