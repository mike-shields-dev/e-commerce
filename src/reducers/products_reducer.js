import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  if (!action.type)
    throw new Error(`No Matching "${action.type}" - action type`);

  switch (action.type) {
    case SIDEBAR_OPEN:
      return {
        ...state, 
        isSidebarOpen: true 
      };
    case SIDEBAR_CLOSE:
      return { 
        ...state, 
        isSidebarOpen: false 
      };
    case GET_PRODUCTS_BEGIN: 
      return {
        ...state, 
        products_loading: true
      };
    case GET_PRODUCTS_ERROR: 
      return { 
        ...state, 
        products_loading: false, 
        products_error: action.payload 
      }
    case GET_PRODUCTS_SUCCESS: 
      const products = action.payload
      const featured_products = 
        products.filter(product => product.featured);

      return {
        ...state, 
        products_loading: false, 
        products,
        featured_products, 
      };
    default:
      return state;
  }
};

export default products_reducer;
