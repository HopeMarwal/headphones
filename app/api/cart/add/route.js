import { connectToDb } from "@/utils/database"
import Cart from "@/models/cart";

export const POST = async (req, res) => {
  const { userId, quantity, productId } = await req.json()
  try {
    await connectToDb();

    const existingCart = await Cart.findOne({ user: userId})
    console.log(existingCart)

    if(existingCart) {

      console.log('Cart is already exists')
      const itemToAdd = {
        user: userId,
        quantity: quantity,
        product_id: productId
      }
      existingCart.products.push(itemToAdd)

      await existingCart.save()
      return new Response(JSON.stringify(existingCart), { status: 200 })
      
    } else {
      const newCartItem = new Cart({
        user: userId,
        products: [
          {
            product_id: productId,
            quantity: quantity
          }
        ]
      })
      await newCartItem.save()
      
      return new Response(JSON.stringify(newCartItem), { status: 201 })
    }

    

  } catch (error) {
    
    console.log(error)
  }
}

//PATCH (update)
// export const PATCH = async ( req, { params }) => {
//   const { prompt, tag, img } = await req.json();

//   try {
//     await connectToDB();
//     //get prompt by id
//     const existingPrompt = await Prompt.findById(params.id)

//     if(!existingPrompt) {
//       return new Response('Prompt not found', { status: 404 })
//     }

//     existingPrompt.prompt = prompt
//     existingPrompt.tag = tag
//     existingPrompt.img = img

//     await existingPrompt.save()

//     return new Response(JSON.stringify(existingPrompt), { status: 200 })
//   } catch (error) {
//     return new Response('Failed to update the prompt', { status: 500 })
//   }
// }