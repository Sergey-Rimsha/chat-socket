import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';

import { io } from 'socket.io-client';

import s from './App.module.scss';

type UserType = {
  name: string;
  id: string;
};

type MessageStateType = {
  message: string;
  id: string;
  user: UserType;
};

const state: MessageStateType[] = [
  { message: 'hello', id: '4545', user: { id: '45r4as5', name: 'Sergey' } },
  { message: 'hello', id: '454ds5', user: { id: '45e4as5', name: 'Sasha' } },
  { message: 'hello', id: '4asd545', user: { id: '45s4as5', name: 'Sveta' } },
];

const socket = io('http://localhost:7001', {});

const App = (): ReactElement => {
  const [messages, setMessages] = useState<MessageStateType[]>(state);

  const [mess, setMess] = useState<string>('');
  const [name, setName] = useState<string>('');

  const chatBlock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBlock.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (): void => {
    if (mess) {
      socket.emit('client-message-sent', mess);
      setMess('');
    }
  };

  const onChangeMassage = () => {
    return (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMess(event.currentTarget.value);
    };
  };

  const onChangeName = () => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value);
    };
  };

  const sendName = () => {
    return () => {
      if (name) {
        socket.emit('client-name-set', name);
      }
    };
  };

  useEffect(() => {
    socket.on('init-messages-published', (state: MessageStateType[]) => {
      setMessages(state);
    });
    socket.on('new-message-sent', (newMessage: MessageStateType) => {
      setMessages(messages => [...messages, newMessage]);
    });
  }, []);

  return (
    <div className={s.App}>
      <div>
        <h4>Change user name</h4>
        <input type="text" value={name} onChange={onChangeName()} />
        <button type="button" onClick={sendName()}>
          send
        </button>
      </div>
      <div className={s.chat}>
        <h2 className={s.chat__title}>Chat</h2>
        {messages?.map(m => {
          return (
            <div key={m.id} className={s.chat__item}>
              <div className={s.chat__name}>{m.user.name}</div>
              <div className={s.chat__message}>message: {m.message}</div>
            </div>
          );
        })}
        <div ref={chatBlock} />
      </div>
      <div>
        <h4>Change message</h4>
        <textarea value={mess} onChange={onChangeMassage()} />
        <button type="button" onClick={() => sendMessage()}>
          send
        </button>
      </div>
    </div>
  );
};

export default App;
