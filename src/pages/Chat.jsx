import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import ChatMessage from '../components/chat/ChatMessage.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { chatService } from '../services/chatService.js';
import { productService } from '../services/productService.js';

export default function Chat() {
  const { productId } = useParams();
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const product = productId ? productService.getProductById(productId) : null;

    if (product) {
      const result = chatService.startConversation(product, user.id);
      setConversations(result.conversations);
      setActiveId(result.activeConversation.id);
      return;
    }

    const storedConversations = chatService.getConversations(user.id);
    setConversations(storedConversations);
    setActiveId(storedConversations[0]?.id || null);
  }, [productId, user.id]);

  const activeConversation = conversations.find((conversation) => conversation.id === activeId);

  function handleSubmit(event) {
    event.preventDefault();
    const message = draft.trim();

    if (!message || !activeConversation) {
      return;
    }

    const nextConversations = chatService.sendMessage(user.id, activeConversation.id, message);
    setConversations(nextConversations);
    setDraft('');
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Chat interno</span>
          <h1>Conversas simuladas</h1>
          <p>Interface visual para negociacao entre comprador e vendedor, sem tempo real nesta versao.</p>
        </div>

        <div className="chat-layout">
          <aside className="conversation-list" aria-label="Lista de conversas">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={conversation.id === activeId ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveId(conversation.id)}
              >
                <img src={conversation.sellerAvatar} alt={conversation.sellerName} />
                <span>
                  <strong>{conversation.sellerName}</strong>
                  <small>{conversation.productName}</small>
                </span>
              </button>
            ))}
          </aside>

          <section className="chat-panel" aria-label="Conversa ativa">
            {activeConversation ? (
              <>
                <header className="chat-header">
                  <div>
                    <span>Negociando</span>
                    <strong>{activeConversation.productName}</strong>
                  </div>
                  <p>{activeConversation.sellerName}</p>
                </header>

                <div className="messages-list">
                  {activeConversation.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>

                <form className="chat-form" onSubmit={handleSubmit}>
                  <label className="sr-only" htmlFor="chat-message">
                    Mensagem
                  </label>
                  <input
                    id="chat-message"
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                  />
                  <Button type="submit">Enviar</Button>
                </form>
              </>
            ) : (
              <div className="empty-state inline-empty">
                <h2>Nenhuma conversa disponivel</h2>
                <p>Abra uma peca do catalogo e inicie uma conversa.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
