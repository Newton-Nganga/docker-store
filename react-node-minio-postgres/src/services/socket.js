import { io } from 'socket.io-client';
import useAuthStore from '../store/auth.store';

const socket = io('/', {
  autoConnect: false
});

socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

socket.on('tokenRefresh', async ({ token }) => {
  useAuthStore.getState().setToken(token);
});

export const connectSocket = (token) => {
  socket.auth = { token };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;