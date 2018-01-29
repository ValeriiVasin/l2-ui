interface IL2OnConfigItem {
  l2onId: number;
  name: string;
  favorite?: boolean;
  type: TL2OnConfigItemType;
}

type TL2OnConfigItemType = 'resource' | 'recipe' | 'piece' | 'enchant';
type TL2OnConfigFilterType = TL2OnConfigItemType | 'all' | 'favorites';

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

/** Crystal app typings */
interface ICrystalsAppState {
  loading: boolean;
  interest: number;
  price: {
    D: number;
    C: number;
    B: number;
  };
  text: string;
  items: Array<IItemCrystalsInfo>,
}

type TCrystalRank = 'A' | 'B' | 'C' | 'D';

interface ICrystalInfo {
  rank: TCrystalRank;
  amount: number;
}

interface IItemCrystalsInfo {
  name: string;
  amount: number;
  crystals: ICrystalInfo;
}

interface IAppState {
  crystals: ICrystalsAppState;

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
        l2on: IL2OnConfigItem[];
      };

      l2on: {
        currentPrices: IL2OnCurrentPricesList;
      };

      updates: {
        l2on: string;
      }
    };
  };

  market: {
    filter: TL2OnConfigFilterType;
    expandedItems: {
      [id: string]: boolean;
    }
  }
}
