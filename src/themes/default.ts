export const theme = {
  space: {
    none: 0,
    quarck: 1,
    prim: 3,
    qm: 5,
    cake: 8,
    nano: 13,
    xxxs: 16,
    xx: 20,
    xxs: 24,
    xs: 32,
    sm: 40,
    md: 48,
    xl: 64,
    xxl: 80,
  },
  colors: {
    primary: "#5bdaff",
    primaryOpacity: "rgba(91,218,255, .2)",
    textColor1: "#fff",
    textColor2: "#a4a2ae",
    textColor3: "#848192",
    base: "#161616",
    base2: "#262526",

    lightOpacity1: "rgba(173,173,173,.1)",
    lightOpacity2: "rgba(173,173,173,.2)",
    lightOpacity3: "rgba(173,173,173,.3)",
  },
  fonts: {
    bold: "NunitoSansBold",
    regular: "NunitoSansRegular",
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48],
  radii: {
    nano: 6,
    xxxs: 10,
    default: 8,
    xs: 15,
    xi: 100,
    infinity: 999999,
  },
  borderWidths: {
    nano: 1,
    prim: 2,
    quarck: 1.5,
    xxxs: 3,
    xs: 6,
  },
};

export type ThemeProps = typeof theme;
