import { connectToDb } from "@/utils/database"
import Cart from "@/models/cart";

//PATCH (update)
export const PATCH = async ( req ) => {
  const { productId, quantity, userId } = await req.json();

  try {
    await connectToDb();
    //get Cart by id
    const existingCart = await Cart.findOne({ user: userId})

    // Check if Cart exists
    if(!existingCart) {
      return new Response('Product not found', { status: 404 })
    }
    
    // Find product by productID
    for(let i = 0; i < existingCart.products.length; i++) {
     
      if(existingCart.products[i].product_id == productId) {
       
        existingCart.products[i].quantity = quantity
      }
    }
    // Save changes to db
    existingCart.save()

    return new Response(JSON.stringify(existingCart), { status: 200 })
  } catch (error) {
    return new Response('Failed to update quantity product', { status: 500 })
  }
}
