import { io, Socket } from 'socket.io-client';

export type UserType = {
  name: string;
  id: string;
};

export type MessageStateType = {
  message: string;
  id: string;
  user: UserType;
};

const buseURL = 'http://localhost:7001';

export const socketApi = {
  socket: null as null | Socket,

  createConnection() {
    this.socket = io(buseURL, {});
  },

  subscribe(
    initMessagesHandler: (messages: MessageStateType[]) => void,
    newMessageHandler: (newMessage: MessageStateType) => void,
  ) {
    this.socket?.on('init-messages-published', initMessagesHandler);
    this.socket?.on('new-message-sent', newMessageHandler);
  },

  sendMessage(message: string) {
    this.socket?.emit('client-message-sent', message);
  },

  sendName(name: string) {
    this.socket?.emit('client-name-set', name);
  },

  destroyConnection() {
    this.socket?.disconnect();
    this.socket = null;
  },
};
