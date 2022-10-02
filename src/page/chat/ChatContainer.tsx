import React, { ReactElement, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { MessageStateType } from '../../api/SocketApi';
import {
  createConnection,
  destroyConnection,
  sendMessageTC,
  sendNameTC,
} from '../../store/chatReducer';
import { RootState, useAppDispatch } from '../../store/store';

import { Chat } from './Chat';

export const ChatContainer = (): ReactElement => {
  const messages = useSelector<RootState, MessageStateType[]>(
    (state: RootState) => state.chat.messages,
  );

  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');

  const dispatch = useAppDispatch();

  const setMassageState = (message: string): void => {
    setMessage(message);
  };

  const sendMessage = (): void => {
    if (message) {
      dispatch(sendMessageTC(message));
      setMessage('');
    }
  };

  const setNameState = (name: string): void => {
    setName(name);
  };

  const sendName = (): void => {
    if (name) {
      dispatch(sendNameTC(name));
    }
  };

  useEffect(() => {
    dispatch(createConnection());

    return () => {
      dispatch(destroyConnection());
    };
  }, [dispatch]);

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
