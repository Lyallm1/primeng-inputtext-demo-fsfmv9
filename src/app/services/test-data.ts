
import { Asset, HelmMap, MineSite } from './config.service';

export const helmMaps : HelmMap[] = [
  {
    name: 'Minerals Australia',
    code: 'AUSTRALIA',
    // center: { latitude: -24.953079213138153, longitude: 134.21417291219325 },
    bounds: [
      { latitude: -44.62543772153735, longitude: 110.81767545850764 },
      { latitude: -7.541895901227803, longitude: 163.02470692455506 },
    ],
    zoomLevel: 4,
    color: '#f67b2f',
  },
  {
    name: 'Minerals America',
    code: 'AMERICAS',
    // center: { latitude: -16.986104095490113, longitude: -59.93881168453747 },
    bounds: [
      { latitude: -58.587873360511196, longitude: -92.06320405681494 },
      { latitude: 23.296094347880523, longitude: -30.899552811291496 },
    ],
    zoomLevel: 3.6,
    color: '#3799bd',
  },
];

export const assets : {[mapName : string] : Asset[]} = {
  AMERICAS: [
    {
      name: 'COPPER AMERICAS',
      code: 'COPPERAMERICAS',
      description: 'Copper, Americas',
      location: { latitude: -25.89905035262376, longitude: -65.607134332251 },
    },
  ],
  AUSTRALIA: [
    {
      name: 'WAIO',
      code: 'WAIO',
      description: 'Western Australia Iron Ore',
      location: { latitude: -22.00625012503012, longitude: 121.64635829651229 },

    },
    {
      name: 'NICKEL WEST',
      code: 'NICKWEST',
      description: 'Nickel West',
      location: { latitude: -29.680340726937015, longitude: 122.31152047477948 },

    },
    {
      name: 'COAL',
      code: 'COAL',
      description: 'Coal BMA, BMC, NSWEC',
      location: { latitude: -27.37544948739236, longitude: 148.54847306198567 },
      subAssets: [
        {
          name: 'COAL BMA',
          code: 'COALBMA',
          description: 'Coal BMA',
        },
        {
          name: 'COAL BMC',
          code: 'COALBMC',
          description: 'Coal BMC',
        },
        {
          name: 'COAL NSWEC',
          code: 'COALNSWEC',
          description: 'New South Wales Energy Coal',
        },
      ],
    },
  ],

  // {
  //   name: "OLYMPIC DAM",
  //   code: "OLYMPICDAM",
  //   description: "Olympic Dam",
  // },
};

export const mineSites : MineSite[] = [
  {
    name: 'Yandi',
    code: 'Yandi',
    asset: 'WAIO',
  },
  {
    name: 'Jimblebar',
    code: 'Jimblebar',
    asset: 'WAIO',
  },
  {
    name: 'Mining Area C',
    code: 'MAC',
    asset: 'WAIO',
  },

  {
    name: 'Eastern Ridge',
    code: 'EasternRidge',
    asset: 'WAIO',
  },
  {
    name: 'Mount Whaleback',
    code: 'MtWhaleback',
    asset: 'WAIO',
  },
  {
    name: 'Mount Keith',
    code: 'MtKeith',
    asset: 'NICKEL WEST',
  },
  {
    name: 'Leinster',
    code: 'Leinster',
    asset: 'NICKEL WEST',
  },
  {
    name: 'Yak',
    code: 'Yak',
    asset: 'NICKEL WEST',
  },
  {
    name: 'Olympic Dam site 1',
    code: 'OLYMPICDAM1',
    asset: 'OLYMPIC DAM',
  },
  {
    name: 'Olympic Dam site 2',
    code: 'OLYMPICDAM2',
    asset: 'OLYMPIC DAM',
  },
  {
    name: 'Blackwater',
    code: 'Blackwater',
    asset: 'COAL BMA',
  },
  {
    name: 'Broadmeadow',
    code: 'Broadmeadow',
    asset: 'COAL BMA',
  },
  {
    name: 'Caval Ridge',
    code: 'CavalRidge',
    asset: 'COAL BMA',
  },
  {
    name: 'Daunia',
    code: 'Daunia',
    asset: 'COAL BMA',
  },
  {
    name: 'Saraji',
    code: 'Saraji',
    asset: 'COAL BMA',
  },
  {
    name: 'South Walker Creek',
    code: 'SouthWalkerCreek',
    asset: 'COAL BMC',
  },
  {
    name: 'Poitrel',
    code: 'Poitrel',
    asset: 'COAL BMC',
  },
  {
    name: 'MtArthur',
    code: 'MtArthur',
    asset: 'COAL NSWEC',
  },

  /* AMERICAS */
  {
    name: 'Cerro Colorado',
    code: 'CerroColorado',
    asset: 'COPPER AMERICAS',
  },
  {
    name: 'Escondida',
    code: 'Escondida',
    asset: 'COPPER AMERICAS',
  },
  {
    name: 'Spence',
    code: 'Spence',
    asset: 'COPPER AMERICAS',
  },
];
