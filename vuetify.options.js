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

const PRIMARY_COLOR = process.env.PRIMARY_COLOR || "#26a69a";

export default function() {
  return {
    theme: {
      dark: process.env.DARK || true,
      themes: {
        light: {
          primary: PRIMARY_COLOR
        },
        dark: {
          primary: PRIMARY_COLOR,
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
