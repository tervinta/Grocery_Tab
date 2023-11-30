const db = require("../config/connection");
const { User, Product, Category, Store } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "vegetables" },
    { name: "fruits" },
    { name: "meats" },
    { name: "dessert" },
    { name: "dairy" },
  ]);

  console.log("categories seeded");

  await User.deleteMany();

  const users = await User.create([
    {
      username: "Ben Livingston",
      email: "seller1@email.com",
      password: "password12345",
      account: "seller",
    },
    {
      username: "Jude Hale",
      email: "seller2@email.com",
      password: "password12345",
      account: "seller",
    },
    {
      username: "Mahdi Cabrera",
      email: "seller3@email.com",
      password: "password12345",
      account: "seller",
    },
    {
      username: "Alfred Wade",
      email: "buyer1@email.com",
      password: "password12345",
      account: "buyer",
    },
    {
      username: "Brian Levine",
      email: "buyer2@email.com",
      password: "password12345",
      account: "buyer",
    },
    {
      username: "Aleesha Davidson",
      email: "buyer3@gmail.com",
      password: "password12345",
      account: "buyer",
    },
  ]);

  console.log("users seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "bananas",
      price: 2,
      description: "PRODUCT DESCRIPTION",
      quantity: 25,
      image: "",
      category: categories[1]._id,
    },
    {
      name: "carrots",
      price: 1,
      description: "PRODUCT DESCRIPTION",
      quantity: 10,
      image: "",
      category: categories[0]._id,
    },
    {
      name: "rib eye steak",
      price: 15,
      description: "PRODUCT DESCRIPTION",
      quantity: 5,
      image: "",
      category: categories[2]._id,
    },
    {
      name: "ben & jerry's cookies and cream",
      price: 5,
      description: "PRODUCT DESCRIPTION",
      quantity: 10,
      image: "",
      category: categories[3]._id,
    },
    {
      name: "2% milk, 4L",
      price: 3,
      description: "PRODUCT DESCRIPTION",
      quantity: 12,
      image: "",
      category: categories[4]._id,
    },
    {
      name: "strawberries",
      price: 3,
      description: "PRODUCT DESCRIPTION",
      quantity: 50,
      image: "",
      category: categories[1]._id,
    },
    {
      name: "broccoli",
      price: 1,
      description: "PRODUCT DESCRIPTION",
      quantity: 28,
      image: "",
      category: categories[0]._id,
    },
    {
      name: "lean ground beef chuck 80/20",
      price: 25,
      description: "PRODUCT DESCRIPTION",
      quantity: 5,
      image: "",
      category: categories[2]._id,
    },
    {
      name: "lotus paste moon cake with 2 yolks",
      price: 12,
      description: "PRODUCT DESCRIPTION",
      quantity: 8,
      image: "",
      category: categories[3]._id,
    },
    {
      name: "heavy cream",
      price: 4,
      description: "PRODUCT DESCRIPTION",
      quantity: 7,
      image: "",
      category: categories[4]._id,
    },
  ]);

  console.log("products seeded");

  await Store.deleteMany();

  const stores = await Store.insertMany([
    {
      storeName: "Cuisette",
      storeOwner: users[0]._id,
      products: [products[0]._id, products[1]._id, products[2]._id],
    },
    {
      storeName: "Shopistry",
      storeOwner: users[1]._id,
      products: [products[3]._id, products[4]._id, products[5]._id],
    },
    {
      storeName: "Barncart",
      storeOwner: users[2]._id,
      products: [
        products[6]._id,
        products[7]._id,
        products[8]._id,
        products[9]._id,
      ],
    },
  ]);

  console.log("stores seeded");

  process.exit();
});