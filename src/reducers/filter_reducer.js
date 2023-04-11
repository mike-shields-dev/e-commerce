import * as actions from "../actions";

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
  if (!(action.type in actions)) {
    throw new Error(`No Matching "${action.type}" - action type`);
  }

  switch (action.type) {
    case LOAD_PRODUCTS: {
      const loadedProducts = action.payload;
      const loadedPrices = loadedProducts.map((product) => product.price);
      const maxPrice = Math.max(...loadedPrices);
      const minPrice = Math.min(...loadedPrices);

      return {
        ...state,
        all_products: [...loadedProducts],
        filtered_products: [...loadedProducts],
        filters: {
          ...state.filters,
          price: maxPrice,
          max_price: maxPrice,
          min_price: minPrice,
        },
      };
    }

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case SORT_PRODUCTS: {
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];

      if (sort === "price-asc") {
        tempProducts = filtered_products.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-desc") {
        tempProducts = filtered_products.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-asc") {
        tempProducts = filtered_products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === "name-desc") {
        tempProducts = filtered_products.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      return {
        ...state,
        filtered_products: tempProducts,
      };
    }

    case UPDATE_FILTERS: {
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    }

    case FILTER_PRODUCTS: {
      const { text, category, company, colour, price, shipping } =
        state.filters;
      const filteredProducts = state.all_products.reduce(
        (filteredProducts, product) => {
          const textMatches = 
            product.name
              .toLowerCase()
              .includes(text.toLowerCase());

          const categoryMatches =
            product.category === category || category === "all";

          const companyMatches =
            product.company === company || company === "all";

          const colourMatches =
            product.colors.includes(colour) || colour === "all";

          const priceMatches = product.price <= price;

          const shippingMatches = product.shipping === shipping;

          if (
            textMatches &&
            categoryMatches &&
            companyMatches &&
            colourMatches &&
            priceMatches &&
            shippingMatches
          ) {
            filteredProducts.push(product);
          }

          return filteredProducts;
        },
        []
      );

      return {
        ...state,
        filtered_products: filteredProducts,
      };
    }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          colour: "all",
          price: state.filters.max_price,
          shipping: true,
        },
      };

    default:
      return state;
  }
};

export default filter_reducer;
