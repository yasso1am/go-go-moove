import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user', 'auth'],
}

const pReducer = persistReducer(persistConfig, rootReducer)

const enhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

export const store = createStore(pReducer, {}, enhancers)
export const persistor = persistStore(store)
