import { 
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_PRODUCTS,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    REMOVE_FROM_CART,
    USER_PROFILE
} from './actions';

const initialState = {
    cart: [],
    products: [],
    categories: []
}

export const reducer = (state = initialState, action) => {
 
    switch (action.type) {
      case USER_PROFILE: {
        return {
          ...state,
          user: {
            ...state.user,
            profile: {
              id: action.payload._id,
              email: action.payload.email,
              username: action.payload.username,
              
            },
          },
        };
      };
        case ADD_TO_CART:
          return {
            ...state,
            cart: [...state.cart, action.product],
          };

        case UPDATE_PRODUCTS:
          console.log(action);
          return {
            ...state,
            products: [...action.products || []]
          };

        case UPDATE_CATEGORIES:
          console.log(action);
          return {
            ...state,
            categories: [...action.categories || []]
          };

        case ADD_MULTIPLE_TO_CART:
          console.log(action);
          return {
            ...state,
            cart: [...state.cart, ...action.items || []],
          };

        case REMOVE_FROM_CART:
          console.log(action);
          let newState = state.cart.filter(product => {
            console.log(product);
            return product._id !== action.item;
          });
          return {
            ...state,
            cart: newState
          };

        case UPDATE_CART_QUANTITY:
          console.log(action);
          return {
            ...state,
            cart: state.cart.map(product => {
              if (action._id === product._id) {
                product.purchaseQuantity = action.purchaseQuantity;
              }
              return product;
            })
          };

          case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

        case CLEAR_CART:
          return {
            ...state,
            cartOpen: false,
            cart: []
          };
        default:
          return state;
      }
    };
