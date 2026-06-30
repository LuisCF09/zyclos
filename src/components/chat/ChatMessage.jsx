export default function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.author === 'me' ? 'is-mine' : 'is-theirs'}`}>
      <p>{message.text}</p>
      <span>{message.time}</span>
    </div>
  );
}
