import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

import { MessageStateType } from '../api/SocketApi';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    createConnectionSocket: build.query({
      query: () => '/',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          const socket = io('http://localhost:7001', {});

          await cacheDataLoaded;

          socket.on('init-messages-published', (messages: MessageStateType[]) => {
            console.log(messages);
            // dispatch(setMessages({ messages }));
            updateCachedData(draft => {
              draft.splice(0, draft.length, ...messages);
            });
          });
          socket.on('new-message-sent', (newMessage: MessageStateType) => {
            // dispatch(setNewMessage({ message: newMessage }));
            return updateCachedData(draft => {
              draft.push(newMessage);
            });
          });
        } catch {
          await cacheEntryRemoved;
        }
      },
    }),
  }),
});

export const { useCreateConnectionSocketQuery } = baseApi;
