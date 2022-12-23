// constants
const SET_STOCK = 'session/SET_STOCK';
const REMOVE_STOCK = 'session/REMOVE_STOCK';

const setStock = (symbol, stock) => ({
  type: SET_STOCK,
  payload: [symbol, stock]
});

const removeStock = () => ({
  type: REMOVE_STOCK,
})

const initialState = { };



export const thunkAlphaAPI = (symbol) => async (dispatch) => {
  const key = "3GF39QHX8I9QGO8J"
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${key}`;
  const response = await fetch(url);
  console.log("HELLO, API!")

  if (response.ok) {
    const data = await response.json();
    dispatch(setStock(symbol, data["Time Series (5min)"]))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    console.log("API ERROR")
    return ['An API error occurred.']
  }
}




export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STOCK:
      const newState = {...state}
      newState[action.payload[0]] = action.payload[1]
      return newState
    case REMOVE_STOCK:
      return { user: null }
    default:
      return state;
  }
}
