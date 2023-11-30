const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    account: String
    store: Store
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]
    products: [Product]
    product(_id: ID!): Product
    store(_id: ID!): Store
    stores: [Store]
    checkout(products: [ID]!): Checkout
    order(_id: ID!): Order
  }
  
  type Product {
    _id: ID
    name: String
    price: Float
    description: String
    seller: String
  }

  type Store {
    _id: ID
    storeName: String
    storeOwner: User
    products: [Product]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID!
  }

  type Mutation {
    signin(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    
    login(email: String!, password: String!): Auth
    
    addUser(username: String!, email: String!, password: String!, account: String!, store: ID): Auth
    
    updateUser(username: String, email: String, password: String, store: ID): User
    
    addOrder(products: [ID]!): Order
    
    addProduct(name: String!, price: Float!, description: String, quantity: Int, category: ID!): Product
    
    updateProduct(name: String, price: Int, description: String, quantity: Int, category: ID!): Product
  
    createStore(storeName: String!, storeOwner: String!): Store
  }
`;

module.exports = typeDefs;
