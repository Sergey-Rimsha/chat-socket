import React, {
  ChangeEvent,
  ReactElement,
  UIEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { MessageStateType } from '../../api/SocketApi';

import s from './Chat.module.scss';

type ChatPropsType = {
  messages: MessageStateType[];
  message: string;
  name: string;
  setMassageState: (message: string) => void;
  setNameState: (name: string) => void;
  sendMessage: () => void;
  sendName: () => void;
};

export const Chat = (props: ChatPropsType): ReactElement => {
  const {
    messages,
    name,
    message,
    setMassageState,
    setNameState,
    sendName,
    sendMessage,
  } = props;
  const [isAutoScrollActive, setIsAutoScrollActive] = useState<boolean>(true);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

  const chatBlock = useRef<HTMLDivElement>(null);

  // dont auto scrolling chat else me active scroll
  const onScrollChat = () => {
    return (event: UIEvent<HTMLElement>) => {
      if (event.currentTarget.scrollTop > lastScrollTop) {
        setIsAutoScrollActive(true);
      } else {
        setIsAutoScrollActive(false);
      }
      setLastScrollTop(event.currentTarget.scrollTop);
    };
  };

  // else added new message start auto scroll
  useEffect(() => {
    if (isAutoScrollActive) {
      chatBlock.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAutoScrollActive]);

  const onChangeMassage = () => {
    return (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMassageState(event.currentTarget.value);
    };
  };

  const onChangeName = () => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setNameState(event.currentTarget.value);
    };
  };

  return (
    <>
      <div>
        <h4>Change user name</h4>
        <input type="text" value={name} onChange={onChangeName()} />
        <button type="button" onClick={sendName}>
          send
        </button>
      </div>
      <div className={s.chat} onScroll={onScrollChat()}>
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
        <textarea value={message} onChange={onChangeMassage()} />
        <button type="button" onClick={sendMessage}>
          send
        </button>
      </div>
    </>
  );
};
