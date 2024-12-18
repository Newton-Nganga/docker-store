import { useState, useEffect } from 'react';
import { fetchHelloMessage } from '../../services/api';

export function Message() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHelloMessage().then(setMessage);
  }, []);

  return (
    <div className="card">
      <p>Message from server: {message}</p>
    </div>
  );
}