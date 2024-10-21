const productionUrl = "https://firmware-ci.com";
const developmentUrl = "http://localhost:8080";

export default {
  name: "FirmwareCI",
  authorName: "blindspot",
  url: process.env.NODE_ENV === "production" ? productionUrl : developmentUrl,
};
