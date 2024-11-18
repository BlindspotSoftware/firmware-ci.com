export default {
  textImageSections: [
    {
      id: "features",
      headline: "Automated",
      text: "Run your firmware test fully automated and get the reports back into your development environment.",
      image: "screenshot.avif",
      bg: "white",
      links: [
        {
          label: "test page",
          url: "/test",
        },
        {
          label: "External",
          url: "https://google.com",
        },
      ],
    },
    {
      id: "updates",
      headline: "Integratable",
      text: "FirmwareCI integrates and reports back into many development environment like Github, Gitlab and Azure.",
      image: "integration.avif",
      bg: "white",
    },
    {
      headline: "Customizable",
      text: "FirmwareCI gives you the ability to choose from hundreds of plugins – or the freedom to write your own.",
      image: "config.avif",
    },
    {
      headline: "Hardware connects us",
      text: "We developed our own tooling to access and control the hardware. Feel free to use our tooling, or rely on your own. It's your hardware and your choice!",
      image: "hardware.avif",
    },
  ],
  // Images are located at `src/assets/images/logos`
  logoRow: [
    {
      name: "Open Compute Project",
      image: "openstartup.png",
      url: "https://www.opencompute.org/membership/startup-directory",
    },
    {
      name: "9elements Cyber Security",
      image: "9esec.svg",
      url: "https://9esec.io",
    },
    {
      name: "Open Source Firmware Foundation",
      image: "osff.svg",
      url: "https://osfw.foundation",
    },
  ],
};
