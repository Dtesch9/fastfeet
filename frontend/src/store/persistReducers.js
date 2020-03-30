import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth', 'admin'],
    },
    reducers
  );

  return persistedReducers;
};
