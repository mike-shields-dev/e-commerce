import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch(action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state, 
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      }
    case SET_GRIDVIEW: 
      return {
        ...state,
        grid_view: true,
      }
    case SET_LISTVIEW: 
      return {
        ...state, 
        grid_view: false,
      }
    case UPDATE_SORT: 
      return {
        ...state,
        sort: action.payload,
      }
    case SORT_PRODUCTS: 
      const { sort, filtered_products } = state;
      let sorted_products = filtered_products;

      if(sort === 'price-asc') {
        sorted_products = filtered_products
          .sort((a, b) => a.price - b.price);
      }
      if(sort === 'price-desc') {
        sorted_products = filtered_products
          .sort((a, b) => b.price - a.price);
      }
      if(sort === "name-asc") {
        sorted_products = filtered_products
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      if(sort === "name-desc") {
        sorted_products = filtered_products
          .sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        filtered_products: sorted_products,
      }
    default: 
      return state;
  }
}

export default filter_reducer;
