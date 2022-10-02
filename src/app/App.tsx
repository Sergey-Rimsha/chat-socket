import React, { ReactElement } from 'react';

import { ChatContainer } from '../page/chat/ChatContainer';

import s from './App.module.scss';

const App = (): ReactElement => {
  return (
    <div className={s.App}>
      <ChatContainer />
    </div>
  );
};

export default App;
