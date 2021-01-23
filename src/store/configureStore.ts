import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import  categoryReducer from "./reducer";
import { AppActions } from "../model/actionTypes";

export const rootReducer = combineReducers({
    categories: categoryReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))