import { io } from 'socket.io-client';

function socketBaseUrl() {
  const configured = (__SERVER_URL__ || '').trim().replace(/\/+$/, '');
  if (!configured) return window.location.origin;
  return configured.replace(/\/api$/i, '');
}

export function connectSocket() {
  const token = localStorage.getItem('garbamate_token');
  return io(socketBaseUrl(), { autoConnect: true, auth: { token } });
}
