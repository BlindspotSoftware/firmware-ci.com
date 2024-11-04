const productionUrl = "https://firmware-ci.com";
const developmentUrl = "http://localhost:8080";

export default {
  name: "FirmwareCI",
  authorName: "blindspot",
  url:
    process.env.DEPLOY_PRIME_URL ||
    (process.env.NODE_ENV === "production" ? productionUrl : developmentUrl),
  metaDesc:
    "Test your Firmware with ease using the next-generation test framework FirmwareCI.",
};
