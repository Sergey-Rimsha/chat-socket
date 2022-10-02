import React, { ReactElement } from 'react';

import s from './App.module.scss';
import { ChatContainer } from './page/chat/ChatContainer';

const App = (): ReactElement => {
  return (
    <div className={s.App}>
      <ChatContainer />
    </div>
  );
};

export default App;
