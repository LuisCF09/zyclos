import { productService } from './productService.js';
import { readStorage, writeStorage } from './storageService.js';

function getKey(userId) {
  return `zyclos_favorites_${userId || 'visitante'}`;
}

export const favoriteService = {
  getFavoriteIds(userId) {
    return readStorage(getKey(userId), []);
  },

  getFavoriteProducts(userId) {
    const favoriteIds = this.getFavoriteIds(userId);
    return favoriteIds
      .map((productId) => productService.getProductById(productId))
      .filter(Boolean);
  },

  isFavorite(productId, userId) {
    return this.getFavoriteIds(userId).includes(productId);
  },

  toggleFavorite(productId, userId) {
    const favoriteIds = this.getFavoriteIds(userId);
    const nextFavorites = favoriteIds.includes(productId)
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId];

    writeStorage(getKey(userId), nextFavorites);
    return nextFavorites;
  },
};
