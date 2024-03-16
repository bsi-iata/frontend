export const airline = [
  {
    label: "TP",
    value: "TP",
  },
  {
    label: "OZ",
    value: "OZ",
  },

  {
    label: "RU",
    value: "RU",
  },
  {
    label: "EK",
    value: "EK",
  },
  {
    label: "TK",
    value: "TK",
  },
  {
    label: "ET",
    value: "ET",
  },
  {
    label: "RH",
    value: "RH",
  },
  {
    label: "MF",
    value: "MF",
  },

  {
    label: "ZH",
    value: "ZH",
  },
  {
    label: "BR",
    value: "BR",
  },
  {
    label: "CI",
    value: "CI",
  },
  {
    label: "O3",
    value: "O3",
  },
  {
    label: "YG",
    value: "YG",
  },
  {
    label: "3U",
    value: "3U",
  },
  {
    label: "MU",
    value: "MU",
  },
  {
    label: "CA",
    value: "CA",
  },
  {
    label: "HU",
    value: "HU",
  },
  {
    label: "2G",
    value: "2G",
  },
];

const cityArray = [
  "MENDOZA",
  "MONTE LIBANO",
  "NOVOSIBIRSK",
  "AACHEN",
  "AALBORG",
  "AALESUND",
  "Aarau",
  "AARHUS",
  "AAYANG",
  "ABaCangZuQiangZuZiZhiZhou",
  "ABASHIRI",
  "Abbotsford",
  "ABERDEEN",
  "ABHA",
  "ABIDJAN",
  "Abilene",
  "ABOSHI",
  "ABU DHABI",
];

export const city = cityArray.map((item) => ({ label: item, value: item }));

const stateArray = [
  "Beijing",
  "LiaoNing",
  "JiLin",
  "NeiMengGu",
  "HeiLongJiang",
  "ShangHai",
  "ZheJian",
  "JianShu",
  "AnWei",
  "ShanDong",
  "TianJing",
  "JianXi",
  "FuJiang",
  "ChongQing",
  "HuNan",
];

export const state = stateArray.map((item) => ({ label: item, value: item }));

const curruyArray = [
  "ANDORRA",
  "UNITED ARAB EMIRATES",
  "AFGHANISTAN",
  "ANTIGUA AND BARBUDA",
  "ANGUILLA",
  "ARMENIA",
  "ANGOLA",
  "ARGENTINA",
  "AUSTRIA",
  "AUSTRALIA",
  "AZERBAIJAN",
  "BARBADOS",
  "BANGLADESH",
  "BELGIUM",
];

export const contry = curruyArray.map((item) => ({ label: item, value: item }));

const portArray = [
  "HRB",
  "CGQ",
  "DLC",
  "NGB",
  "NKG",
  "SHE",
  "TSN",
  "XIY",
  "PKX",
  "SHA",
  "TAO",
  "XMN",
  "FOC",
  "KMG",
  "HGH",
  "CGO",
  "CTU",
  "KHN",
];

export const port = portArray.map((item) => ({ label: item, value: item }));

const flightArray = [
  "MU791",
  "I98807",
  "HT3829",
  "HT3831",
  "HT3831",
  "OD 613",
  "CZ311",
  "CZ327",
  "CZ699",
];


export const flight = flightArray.map((item) => ({ label: item, value: item }));
