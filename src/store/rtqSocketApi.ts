import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { socketApi } from '../api/SocketApi';

import { setMessages, setNewMessage } from './chatReducer';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    createConnectionSocket: build.query({
      query: () => '/',
      onCacheEntryAdded(arg, { dispatch }) {
        socketApi.createConnection();
        try {
          socketApi.subscribe(
            messages => {
              dispatch(setMessages({ messages }));
            },
            newMessage => {
              dispatch(setNewMessage({ message: newMessage }));
            },
          );
        } catch {
          console.log('error socket api');
        }
      },
    }),
  }),
});

export const { useCreateConnectionSocketQuery } = baseApi;
