import * as actions from '../actions';
const {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} = actions;

const cart_reducer = (state, action) => {
  if (!(action.type in actions)) {
    throw new Error(`No Matching "${action.type}" - action type`)
  }

  switch (action.type) {
    case ADD_TO_CART: {
      const { id, colour, amount, product } = action.payload;

      const existingItem = state.cart.find(existingItem =>
        existingItem.id === id + colour
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart
            .map(item => {
              if (item.id === id + colour) {
                return {
                  ...item,
                  amount: Math.min(item.max, item.amount + amount)
                }
              } 

              return item;
            }),
        }
      } else {
        const newItem = {
          id: id + colour,
          name: product.name,
          colour,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        }
        return {
          ...state,
          cart: [...state.cart, newItem]
        }
      }
    }

    case CLEAR_CART:
      return { ...state, cart: [] }

    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = 
        state.cart.reduce((totals, item) => {
          totals.total_items += item.amount;
          totals.total_amount += item.amount * item.price;
          return totals;
        }, {
          total_items: 0,
          total_amount: 0
        });

        return {
          ...state,
          total_items,
          total_amount,
        }
    }

    case REMOVE_CART_ITEM: {
      const id = action.payload;

      return {
        ...state,
        cart: state.cart.filter(item => item.id !== id)
      }
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const newCart = state.cart.map(item => {
        if (item.id === id) {
          const newAmount = item.amount += value;

          if (newAmount < 1) {
            item.amount = 1;
          } else {
            item.amount = Math.min(newAmount, item.max);
          }
        }
        return item;
      })

      return {
        ...state,
        cart: newCart,
      }
    }

    default:
      return state;
  }
}

export default cart_reducer;
