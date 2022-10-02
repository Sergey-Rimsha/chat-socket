import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { socketApi } from '../api/SocketApi';

export type UserType = {
  name: string;
  id: string;
};

export type MessageType = {
  message: string;
  id: string;
  user: UserType;
};

export type ChatStateType = {
  messages: MessageType[];
};
const initialState: ChatStateType = {
  messages: [
    { message: 'hello', id: '4545', user: { id: '45r4as5', name: 'Sergey' } },
    { message: 'hello', id: '454ds5', user: { id: '45e4as5', name: 'Sasha' } },
    // { message: 'hello', id: '4asd545', user: { id: '45s4as5', name: 'Sveta' } },
  ],
};

type AsyncThunkConfigType = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: {
    error?: Array<string>;
  };
};

// create thunk

// export const _createConnection = createAsyncThunk<any, any, AsyncThunkConfigType>(
//   'chat/connectSocketChat',
//   thunkAPI => {
//     socketApi.createConnection();
//     socketApi.subscribe(
//       messages => {
//         thunkAPI.dispatch(setMessages({ messages }));
//       },
//       newMessage => {
//         thunkAPI.dispatch(setNewMessage({ message: newMessage }));
//       },
//     );
//   },
// );

export const createConnection = () => (dispatch: any) => {
  socketApi.createConnection();
  socketApi.subscribe(
    messages => {
      dispatch(setMessages({ messages }));
    },
    newMessage => {
      dispatch(setNewMessage({ message: newMessage }));
    },
  );
};

export const sendNameTC = createAsyncThunk<any, any, AsyncThunkConfigType>(
  'chat/sendName',
  name => {
    socketApi.sendName(name);
  },
);

export const sendMessageTC = createAsyncThunk<any, any, AsyncThunkConfigType>(
  'chat/sendMessage',
  message => {
    socketApi.sendMessage(message);
  },
);

export const destroyConnection = createAsyncThunk('chat/destroyConnection', () => {
  socketApi.destroyConnection();
});

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<{ messages: MessageType[] }>) {
      state.messages = action.payload.messages;
      console.log(action.payload.messages);
    },
    setNewMessage(state, action: PayloadAction<{ message: MessageType }>) {
      state.messages.push(action.payload.message);
      console.log(action.payload.message);
    },
  },
});

export const chatReducer = slice.reducer;

export const { setMessages, setNewMessage } = slice.actions;
