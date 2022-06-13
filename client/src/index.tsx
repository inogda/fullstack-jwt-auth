import React, {createContext} from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals';
import App from './App';
import Store from "./store/store";


interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Context.Provider value={{
        store
    }}>


            <App />

    </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
