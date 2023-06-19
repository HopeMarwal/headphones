import { connectToDb } from "@/utils/database"
import Cart from "@/models/cart";

export const POST = async (req, res) => {
  const { userId, quantity, productId } = await req.json()
  try {
    await connectToDb();
    const existingCart = await Cart.findOne({ user: userId})

    // Cart is already in collection
    if(existingCart) {

      // Check if item is in Cart
      let isItemInCart = false
      existingCart.products.forEach(el => {
        if( el.product_id == productId) {
          isItemInCart = true
        }
      });
      if( isItemInCart ) {
        return new Response('Item is already in your cart', { status: 208})
      }

      // if current item is not in the cart - add one
      const itemToAdd = {
        user: userId,
        quantity: quantity,
        product_id: productId
      }
      existingCart.products.push(itemToAdd)

      // Save changes 
      await existingCart.save()
      return new Response(JSON.stringify(existingCart), { status: 200 })
      
    } else {
      // If no cart create one
      const newCartItem = new Cart({
        user: userId,
        products: [ { product_id: productId, quantity: quantity } ]
      })
      await newCartItem.save()
      
      return new Response(JSON.stringify(newCartItem), { status: 201 })
    }
  } catch (error) {
    console.log(error)
  }
}
