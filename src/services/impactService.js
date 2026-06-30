const impactByCategory = {
  Camisetas: { water: 800, co2: 1.6 },
  Camisas: { water: 1200, co2: 2.1 },
  Calcas: { water: 3500, co2: 5.4 },
  Vestidos: { water: 1800, co2: 3.2 },
  Saias: { water: 1300, co2: 2.5 },
  Jaquetas: { water: 2400, co2: 4.3 },
  Blazers: { water: 2600, co2: 4.8 },
  Moletons: { water: 2200, co2: 3.9 },
};

export const impactService = {
  calculateProductImpact(product) {
    const categoryImpact = impactByCategory[product?.category] || { water: 1500, co2: 2.8 };

    return {
      water: categoryImpact.water,
      co2: categoryImpact.co2,
      wasteAvoided: 1,
    };
  },

  calculateUserImpact({ user, favoriteIds = [], listings = [] }) {
    const historyCount = user?.history?.length || 0;
    const reusedItems = Math.max(1, historyCount + favoriteIds.length + listings.length);
    const water = reusedItems * 1250 + listings.length * 450;
    const co2 = Number((reusedItems * 2.7 + listings.length * 0.8).toFixed(1));
    const wasteAvoided = reusedItems;
    const score = Math.min(
      100,
      Math.round((user?.sustainableScore || 25) + listings.length * 8 + favoriteIds.length * 3),
    );

    let level = 'Iniciante consciente';
    if (score >= 80) {
      level = 'Referência sustentável';
    } else if (score >= 60) {
      level = 'Agente de reutilização';
    } else if (score >= 40) {
      level = 'Consumo em evolução';
    }

    return {
      reusedItems,
      water,
      co2,
      wasteAvoided,
      score,
      level,
    };
  },
};
