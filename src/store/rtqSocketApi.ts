import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

import { MessageStateType } from '../api/SocketApi';

import { setMessages, setNewMessage } from './chatReducer';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    createConnectionSocket: build.query({
      query: () => 'init-messages-published',
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved, dispatch }) {
        const socket = io('http://localhost:7001', {});

        socket.on('init-messages-published', (messages: MessageStateType[]) => {
          dispatch(setMessages({ messages }));
        });
        socket.on('new-message-sent', (newMessage: MessageStateType) => {
          dispatch(setNewMessage({ message: newMessage }));
          updateCachedData(draft => {
            draft.push(newMessage);
          });
        });
        updateCachedData(draft => {
          console.log(draft);
          draft.push({ el: 'elk' });
        });
        await cacheEntryRemoved;
        socket.close();
      },
    }),
  }),
});

export const { useCreateConnectionSocketQuery } = baseApi;
