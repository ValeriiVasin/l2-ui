interface L2OnConfigItem {
  l2onId: number;
  name: string;
  favorite?: boolean;
  type: L2OnConfigItemType;
}

type L2OnConfigItemType = 'resource' | 'recipe' | 'piece' | 'enchant';
type L2OnConfigFilterType = L2OnConfigItemType | 'all' | 'favorites';

interface L2OnPrice {
  name: string;
  sellPrice: number;
  buyPrice: number;
  shopPrice: number;
}

interface L2OnCurrentPrice {
  price: number;
  amount: number;
  time: number;
  fresh: boolean;
}

interface L2OnCurrentPrices {
  name: string;
  sell: L2OnCurrentPrice[];
  buy: L2OnCurrentPrice[];
}

interface L2OnCurrentPricesList {
  [key: string]: L2OnCurrentPrices;
}

/** Crystal app typings */
interface CrystalsAppState {
  loading: boolean;
  interest: number;
  price: {
    D: number;
    C: number;
    B: number;
  };
  text: string;
  items: Array<ItemCrystalsInfo>,
}

type CrystalRank = 'A' | 'B' | 'C' | 'D';

interface CrystalInfo {
  rank: CrystalRank;
  amount: number;
}

interface ItemCrystalsInfo {
  name: string;
  amount: number;
  crystals: CrystalInfo;
}

interface AppState {
  crystals: CrystalsAppState;

  cli: {
    command: string;
    result: string;
    loading: boolean;
    history: string[];
  };

  firebase: {
    loaded: boolean;
    values: {
      config: {
        l2on: L2OnConfigItem[];
      };

      l2on: {
        currentPrices: L2OnCurrentPricesList;
      };

      updates: {
        l2on: string;
      }
    };
  };

  market: {
    filter: L2OnConfigFilterType;
    expandedItems: {
      [id: string]: boolean;
    }
  }
}
