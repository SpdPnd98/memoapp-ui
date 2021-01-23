import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./store/reducer";
import { applyMiddleware, createStore, Dispatch, Store } from 'redux';
import { CategoryAction, CategoryState } from './model/category';
// added
// import { CategoryProps } from "./model/category";
// import { createStore } from "redux";

const store: Store<CategoryState, CategoryAction> & {
  dispatch: Dispatch
} = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// // Write how to initialize the categories here
// const defaultCategory = {
//   id: 1,
//   name: "Uncategorized",
//   color: "#FFFFFF",
// } //copied from memos

// // Reducer
// const categoriesReducer = (state : CategoryProps[], action : {type: String}) => {
//   switch (action.type) {
//     case "categories/add":
//       return [defaultCategory]; // result of adding some category
//     case "categories/delete":
//       return [defaultCategory]; // result of deleting some category
//     case "categories/update":
//       return [defaultCategory]; // result of updating some category
//     case "categories/read":
//       return [defaultCategory]; // read all categories
//   }
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
