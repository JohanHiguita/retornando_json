const express = require("express")
const app = express()
const mongoose = require("mongoose")


mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/mongo-1",
  { useNewUrlParser: true }
)
mongoose.connection.on("error", function(e) {
  console.error(e)
})

// definimos el schema
const productSchema = mongoose.Schema({
  name: String,
  price: { type: Number}
})

// definimos el modelo
const Product = mongoose.model("Product", productSchema)

app.get("/products", async (req, res) => {
  const products = await Product.find()
  console.log(products)

  res.type('application/json')
  res.json({ products })
  
})

app.listen(3000, () => console.log("Listening on port 3000 ..."))
