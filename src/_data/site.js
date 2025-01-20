const productionUrl = "https://firmware-ci.com";
const developmentUrl = "http://localhost:8080";

export default {
  name: "FirmwareCI",
  authorName: "blindspot",
  url: process.env.NODE_ENV === "production" ? productionUrl : developmentUrl,
  metaDesc:
    "Test your Firmware with ease and accelerate your development using the next-generation AI-driven test framework FirmwareCI.",
};
