"use client"
import { useRef } from "react"
import { AppStore, makeStore } from "./redux"
import { setupListeners } from "@reduxjs/toolkit/query"
import persistStore from "redux-persist/lib/persistStore"
import {Provider} from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

export default function StoreProvider({children} : {children: React.ReactNode}){
    const storeRef = useRef<AppStore>()
    if(!storeRef.current){
        storeRef.current = makeStore()
        setupListeners(storeRef.current.dispatch)
    }
    const  persistor = persistStore(storeRef.current)
    return (
        <Provider store = {storeRef.current}>
            <PersistGate loading = {null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}