const { User, Product, Store, Category, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      return await User.findById(context.user._id);
  },
  users: async () => {
    return await User.find();
  },
  products: async () => {
    return Product.find();
  },
  product: async (parent, { _id }) => {
    return await Product.findById(_id);
  },
  store: async (parent, { _id }) => {
    return await Store.findById(_id).populate("storeOwner");
  },
  stores: async () => {
    return await Store.find().populate("storeOwner");
  },
  checkout: async (parent, args, context) => {
    const url = new URL(context.headers.referer).origin;
    const order = new Order({ products: args.products });
    const line_items = [];

    const { products } = await order.populate("products");

    for (let i = 0; i < products.length; i++) {
      const product = await stripe.products.create({
        name: products[i].name,
        description: products[i].description,
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: products[i].price * 100,
        currency: "USD",
      });

      line_items.push({
        price: price.id,
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/`,
    });

    return { session: session.id };
  },
},
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    signin: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token };
    },
  addOrder: async (parent, { products }, context) => {
    console.log(context);
    if (context.user) {
      const order = new Order({ products });

      await User.findByIdAndUpdate(context.user._id, {
        $push: { orders: order },
      });

      return order;
    }

    throw new AuthenticationError("Not logged in");
  },
  addProduct: async (parent, args, context) => {
    console.log(context);
    //needs authentication to add/create new product
    if (context.user) {
      const product = await Product.create(args);
    }

    return product;
  },
  updateProduct: async (parent, args, context) => {
    if (context.user) {
      return await Product.findByIdAndUpdate(context.product._id, args, {
        new: true,
      });
    }

    throw new AuthenticationError("Not logged in");
  },
  createStore: async (parent, args, context) => {
    //needs authentication to create store
    if (context.user) {
      return await Store.create(args);
    }

    throw new AuthenticationError("Not logged in");
  },
},
};

module.exports = resolvers;
