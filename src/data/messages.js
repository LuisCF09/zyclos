export const initialConversations = [
  {
    id: 'c-001',
    productId: 'p-001',
    productName: 'Jaqueta jeans oversized',
    sellerName: 'Ana Clara',
    sellerAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    messages: [
      {
        id: 'm-001',
        author: 'seller',
        text: 'Oi! A jaqueta ainda esta disponivel para venda ou troca.',
        time: '09:12',
      },
      {
        id: 'm-002',
        author: 'me',
        text: 'Perfeito. Ela tem algum detalhe de uso?',
        time: '09:14',
      },
      {
        id: 'm-003',
        author: 'seller',
        text: 'Nao tem rasgos nem manchas. Posso enviar mais fotos se quiser.',
        time: '09:16',
      },
    ],
  },
  {
    id: 'c-002',
    productId: 'p-004',
    productName: 'Moletom verde musgo',
    sellerName: 'Beatriz Lima',
    sellerAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    messages: [
      {
        id: 'm-004',
        author: 'seller',
        text: 'Consigo entregar perto do metro no fim da tarde.',
        time: '14:30',
      },
      {
        id: 'm-005',
        author: 'me',
        text: 'Otimo, vou confirmar meu horario e te aviso.',
        time: '14:35',
      },
    ],
  },
];
