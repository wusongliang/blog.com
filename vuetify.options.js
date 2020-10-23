import colors from "vuetify/es5/util/colors";
import {
  mdiClose,
  mdiMenu,
  mdiMenuDown,
  mdiBrightness4,
  mdiHome,
  mdiMagnify,
  mdiPostOutline,
  mdiInformationOutline,
  mdiFormatListBulletedType
} from "@mdi/js";

export default function() {
  return {
    theme: {
      dark: process.env.DARK,
      themes: {
        light: {
          primary: process.env.PRIMARY_COLOR || "#26a69a"
        },
        dark: {
          primary: process.env.PRIMARY_COLOR || "#26a69a",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      },
      options: {
        customProperties: true
      }
    },
    icons: {
      iconfont: "mdiSvg",
      values: {
        mdiClose,
        mdiMenu,
        mdiMenuDown,
        mdiBrightness4,
        mdiHome,
        mdiMagnify,
        mdiPostOutline,
        mdiInformationOutline,
        mdiFormatListBulletedType
      }
    }
  };
}
