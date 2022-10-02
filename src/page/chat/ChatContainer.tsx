import React, { ReactElement, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  createConnection,
  destroyConnection,
  sendMessageTC,
  sendNameTC,
} from '../../store/chatReducer';
import { RootState, useAppDispatch } from '../../store/store';

import { Chat } from './Chat';

export type UserType = {
  name: string;
  id: string;
};

export type MessageStateType = {
  message: string;
  id: string;
  user: UserType;
};

// const socket = io('http://localhost:7001', {});

// const state: MessageStateType[] = [
//   { message: 'hello', id: '4545', user: { id: '45r4as5', name: 'Sergey' } },
//   { message: 'hello', id: '454ds5', user: { id: '45e4as5', name: 'Sasha' } },
//   { message: 'hello', id: '4asd545', user: { id: '45s4as5', name: 'Sveta' } },
// ];

export const ChatContainer = (): ReactElement => {
  // const [messages, setMessages] = useState<MessageStateType[]>(state);

  const messages = useSelector<RootState, MessageStateType[]>(state => state.chat.chat);

  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');

  const dispatch = useAppDispatch();

  const setMassageState = (message: string): void => {
    setMessage(message);
  };

  const sendMessage = (): void => {
    if (message) {
      // socket.emit('client-message-sent', message);
      dispatch(sendMessageTC(message));
      setMessage('');
    }
  };

  const setNameState = (name: string): void => {
    setName(name);
  };

  const sendName = (): void => {
    if (name) {
      // socket.emit('client-name-set', name);
      // dispatch(getDataServerSocket({}));
      dispatch(sendNameTC(name));
    }
  };

  useEffect(() => {
    dispatch(createConnection({}));

    // socket.on('init-messages-published', (state: MessageStateType[]) => {
    //   setMessages(state);
    // });
    // socket.on('new-message-sent', (newMessage: MessageStateType) => {
    //   setMessages(messages => [...messages, newMessage]);
    // });
    return () => {
      dispatch(destroyConnection());
    };
  }, []);

  return (
    <Chat
      messages={messages}
      message={message}
      name={name}
      setMassageState={setMassageState}
      setNameState={setNameState}
      sendMessage={sendMessage}
      sendName={sendName}
    />
  );
};
