interface IL2OnConfigItem {
  l2onId: number;
  name: string;
  favorite?: boolean;
  type: TL2OnConfigItemType;
}

type TL2OnConfigItemType = 'resource' | 'recipe' | 'piece' | 'enchant';
type TL2OnConfigFIlterType = TL2OnConfigItemType | 'all' | 'favorites';

interface IAppState {
  firebase: {
    loading: boolean;
    values: {
      config: {
        l2on: IL2OnConfigItem[];
      };
    };
  };

  market: {
    filter: TL2OnConfigFIlterType;
  }
}
