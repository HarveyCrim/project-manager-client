import { combineReducers, configureStore } from "@reduxjs/toolkit"
import globalReducer from "./redux/index"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE
    ,REGISTER
} from "redux-persist"
import { api } from "./redux/api"
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
import { TypedUseSelectorHook, useDispatch, useSelector, Provider } from "react-redux"

const createNoopStorage = () => {
    return {
        getItem(_key: any){
            return Promise.resolve(null)
        },
        setItem(_key: any, value: any){
            return Promise.resolve(value)
        },
        removeItem(_key: any){
            return Promise.resolve()
        }
    }
}

const storage = typeof window == "undefined" ? createNoopStorage() : createWebStorage("local")

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["global"]
}

const rootReducer = combineReducers({
    global: globalReducer,
    [api.reducerPath] : api.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefault) => 
            getDefault({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            }).concat(api.middleware)
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type IRootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

