import * as actions from '../actions'

const {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} = actions; 

const filter_reducer = (state, action) => {
  if(!(action.type in actions)) {   
    throw new Error(
      `No Matching "${action.type}" - action type`
    );
  };

  switch(action.type) {
    case LOAD_PRODUCTS:
      const loadedProducts = action.payload;
      const loadedPrices = loadedProducts.map(product => product.price);

      return {
        ...state, 
        all_products: [...loadedProducts],
        filtered_products: [...loadedProducts],
        filters: {
          ...state.filters,
          max_price: Math.max(...loadedPrices),
          min_price: Math.min(...loadedPrices),
        }
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
      let tempProducts = [...filtered_products];

      if(sort === 'price-asc') {
        tempProducts = filtered_products
          .sort((a, b) => a.price - b.price);
      }
      if(sort === 'price-desc') {
        tempProducts = filtered_products
          .sort((a, b) => b.price - a.price);
      }
      if(sort === "name-asc") {
        tempProducts = filtered_products
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      if(sort === "name-desc") {
        tempProducts = filtered_products
          .sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        filtered_products: tempProducts,
      }

    case UPDATE_FILTERS:      
      const { name, value } = action.payload;
      
      if(!(name in state.filters)) return state;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        }
      }

    case FILTER_PRODUCTS: 
      const filters = action.payload;

      for(const key in filters) {
        console.log(key, filters[key])
      }
      
      return { ...state }

    default: 
      return state;
  }
}

export default filter_reducer;
