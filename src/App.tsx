import React, { ReactElement, useState } from 'react';

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

const initialState: MessageStateType[] = [
  { message: 'hello', id: '4545', user: { id: '45r4as5', name: 'Sergey' } },
  { message: 'hello', id: '454ds5', user: { id: '45e4as5', name: 'Sasha' } },
  { message: 'hello', id: '4asd545', user: { id: '45s4as5', name: 'Sveta' } },
];
const App = (): ReactElement => {
  const [message, setMessage] = useState<MessageStateType[]>(initialState);

  const sendMessage = (): void => {
    setMessage([...initialState]);
  };

  return (
    <div className={s.App}>
      <div className={s.chat}>
        <h2 className={s.chat__title}>Hello world</h2>
        {message.map(m => {
          return (
            <div key={m.id} className={s.chat__item}>
              <div className={s.chat__name}>{m.user.name}</div>
              <div className={s.chat__message}>message: {m.message}</div>
            </div>
          );
        })}
        <div>
          <button type="button" onClick={() => sendMessage()}>
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
