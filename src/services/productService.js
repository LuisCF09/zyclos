import { products } from '../data/products.js';
import { readStorage, writeStorage } from './storageService.js';

const LISTINGS_KEY = 'zyclos_user_listings';
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80';

function getStoredListings() {
  return readStorage(LISTINGS_KEY, []);
}

function saveListings(listings) {
  writeStorage(LISTINGS_KEY, listings);
}

function createId() {
  if (window.crypto?.randomUUID) {
    return `local-${window.crypto.randomUUID()}`;
  }

  return `local-${Date.now()}`;
}

export const productService = {
  getAllProducts() {
    return [...products, ...getStoredListings()];
  },

  getProductById(productId) {
    return this.getAllProducts().find((product) => String(product.id) === String(productId));
  },

  getUserProducts(userId) {
    return getStoredListings().filter((product) => product.ownerId === userId);
  },

  createProduct(productData, user) {
    const listings = getStoredListings();
    const listing = {
      id: createId(),
      ownerId: user.id,
      name: productData.name.trim(),
      brand: productData.brand.trim(),
      category: productData.category,
      size: productData.size,
      color: productData.color.trim(),
      condition: productData.condition,
      price: Number(productData.price),
      negotiation: productData.negotiation,
      image: productData.image || FALLBACK_IMAGE,
      description: productData.description.trim(),
      createdAt: new Date().toISOString(),
      seller: {
        id: user.id,
        name: user.name,
        city: user.city || 'Cidade nao informada',
        avatar: user.avatar,
        rating: 5,
      },
    };

    saveListings([listing, ...listings]);
    return listing;
  },
};
