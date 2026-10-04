import { useState } from 'react';

export default function ChatInput({ disabled, onSend }) {
  const [text, setText] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    const value = text.trim();
    if (!value || disabled) return;
    await onSend(value);
    setText('');
  };
  return <form className="chat-input" onSubmit={submit}>
    <label className="gmh-sr" htmlFor="chat-message">Message</label>
    <input id="chat-message" maxLength={1000} value={text} disabled={disabled} placeholder={disabled ? 'Chat is read-only' : 'Write a message…'} onChange={(event) => setText(event.target.value)} />
    <button type="submit" disabled={disabled || !text.trim()}>Send</button>
  </form>;
}
