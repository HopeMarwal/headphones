import { Schema, model, models } from "mongoose";

const ProductsSchema = new Schema({
  name: { type: String },
  rating: { type: Number },
  price: { type: Number },
  img: { type: String },
  specifications: {
    battery: { type: String },
    bluetooth: { type: String },
    microphone: { type: String }
  }
})

const Products = models.Products || model('Products', ProductsSchema)

export default Products;