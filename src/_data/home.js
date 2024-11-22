export default {
  textImageSections: [
    {
      id: "features",
      headline: "Automated",
      text: "Run your firmware test fully automated on real hardware. FirmwareCI is designed to be fully automated and to run your tests on real hardware. No need to manually connect and disconnect hardware. FirmwareCI takes care - you can invest your time in developing the next feature. That's continuous integration for firmware",
      image: "screenshot.avif",
      bg: "white",
      // links: [
      //   {
      //     label: "test page",
      //     url: "/test",
      //   },
      //   {
      //     label: "External",
      //     url: "https://google.com",
      //   },
      // ],
    },
    {
      headline: "Integratable",
      text: "FirmwareCI integrates and reports back into many development environment like Github, Gitlab and Azure. No need to leave your usual workflow. If you need more detailed reports, our intuitive web interface is just a click away.", 
      image: "integration.avif",
      bg: "white",
    },
    {
      headline: "Customizable",
      text: "FirmwareCI gives you the ability to choose from hundreds of test-step plugins – or the freedom to write your own.",
      image: "config.avif",
      bg: "white",
      links: [
        {
          label: "Learn more",
          url: "https://docs.firmware-ci.com/reference/1_testfile/",
        },
      ],
    },
    {
      id: "updates",
      headline: "Hardware connects us",
      text: "We have developed tooling to access and control the device under test, which will soon be open source! Feel free to use our tooling with FirmwareCI, or rely on your own. It's your hardware and your choice!",
      image: "hardware.avif",
    },
    {
      headline: "Leveraging AI",
      text: "There are more benefits of automated firmware testing to come: To extend your test suite, there is no need to write more test manually. FirmwareCI will learn from your test results and suggest new tests to you. Just tell FirmwareCI 'Add a CPU load test and check the power consumption' and take advantage of top trending AI technologies.",
      image: "ai.webp",
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
