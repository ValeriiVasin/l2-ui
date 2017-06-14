interface IL2OnConfigItem {
  l2onId: number;
  name: string;
  favorite?: boolean;
  type: TL2OnConfigItemType;
}

type TL2OnConfigItemType = 'resource' | 'recipe' | 'piece' | 'enchant';
type TL2OnConfigFIlterType = TL2OnConfigItemType | 'all' | 'favorites';

interface IL2OnPrice {
  name: string;
  sellPrice: number;
  buyPrice: number;
  shopPrice: number;
}

interface IL2OnCurrentPrice {
  price: number;
  amount: number;
  time: number;
  fresh: boolean;
}

interface IL2OnCurrentPrices {
  name: string;
  sell: IL2OnCurrentPrice[];
  buy: IL2OnCurrentPrice[];
}

interface IL2OnCurrentPricesList {
  [key: string]: IL2OnCurrentPrices;
}

interface IAppState {
  firebase: {
    loaded: boolean;
    values: {
      config: {
        l2on: IL2OnConfigItem[];
      };

      l2on: {
        currentPrices: IL2OnCurrentPricesList;
      };
    };
  };

  market: {
    filter: TL2OnConfigFIlterType;
    expandedItems: {
      [id: string]: boolean;
    }
  }
}
