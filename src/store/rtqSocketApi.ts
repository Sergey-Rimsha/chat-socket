import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

import { MessageStateType } from '../api/SocketApi';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    createConnectionSocket: build.query({
      query: () => 'init-messages-published',
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved }) {
        const socket = io('http://localhost:7001', {});

        socket.on('init-messages-published', (messages: MessageStateType[]) => {
          updateCachedData(draft => {
            // console.log(draft);
            draft.push(messages);
          });
        });
        socket.on('new-message-sent', (newMessage: MessageStateType) => {
          updateCachedData(draft => {
            draft.push(newMessage);
          });
        });
        await cacheEntryRemoved;
        socket.close();
      },
    }),
  }),
});

export const { useCreateConnectionSocketQuery } = baseApi;
