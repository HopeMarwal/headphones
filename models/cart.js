import { Schema, model, models } from "mongoose";

const CartSchema = new Schema({
  user: {
    type: String
  },
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
      },
      quantity: {
        type: Number
      }
    }
  ]
})

const Cart = models.Cart || model('Cart', CartSchema)

export default Cart;