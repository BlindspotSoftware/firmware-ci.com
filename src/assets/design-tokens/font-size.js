// import { calculateTypeScale } from "utopia-core";
import { interpolate } from "../../utils/css/interpolate";

/**
 * Define your font-size scale here
 * You can use the `calculateTypeScale` function from `utopia-core` to generate a scale, visually customizable on https://utopia.fyi/type/calculator/ and copyable to your project in the "PostCSS" tab on the site
 */
export const fontSize = {
  sm: interpolate({ min: 14, max: 16 }),
  base: interpolate({ min: 16, max: 18 }),
  md: interpolate({ min: 18, max: 20 }),
  lg: interpolate({ min: 20, max: 24 }),
  xl: interpolate({ min: 22, max: 28 }),
  "2xl": interpolate({ min: 24, max: 32 }),
  "3xl": interpolate({ min: 36, max: 48 }),
  "4xl": interpolate({ min: 40, max: 72 }),
};

/**
 * Example of using `calculateTypeScale` to generate a scale
 */

// calculateTypeScale({
//   minWidth: 320,
//   maxWidth: 1140,
//   minFontSize: 16,
//   maxFontSize: 20,
//   minTypeScale: 1.2,
//   maxTypeScale: 1.25,
//   positiveSteps: 5,
//   negativeSteps: 2,
//   prefix: "step",
// }).reduce(
//   (obj, item) => ({
//     ...obj,
//     ...{ [`step-${item.step}`]: item.clamp },
//   }),
//   {}
// );
