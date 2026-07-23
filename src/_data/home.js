export default {
  textImageSections: [
    {
      id: "features",
      headline: "Automate Your Firmware Testing",
      text: "Run your firmware test fully automated on real hardware. FirmwareCI is designed to be fully automated and to run your tests on real hardware. No need to manually connect and disconnect hardware. FirmwareCI takes care - you can invest your time in developing the next feature. That's continuous integration for firmware",
      painpoint: "Stop wasting time with manual testing and hardware setups.",
      image: "screenshot.avif",
      darkImage: "screenshot-dark.avif",
      alt: "A FirmwareCI request expanded to show its jobs running on an HPE ProLiant DL320 — boot, console, inventory, sensor and smoke tests, all passing.",
      bg: "white",
    },
    {
      headline: "Seamlessly Integrate into Your CI/CD Workflow",
      text: "FirmwareCI plugs into your CI/CD and reports results straight back into it — whether you run GitHub, GitLab or Gerrit. No need to leave your usual workflow; and when you want the full picture, our web interface is just a click away.",
      painpoint: "No more context switching between different tools and platforms.",
      image: "integration.avif",
      darkImage: "integration-dark.avif",
      alt: "A CI/CD pipeline running FirmwareCI jobs in a build workflow, producing firmware artifacts.",
      bg: "white",
    },
    {
      headline: "Customize Tests for Your Needs",
      text: "FirmwareCI gives you the ability to choose from hundreds of test-step plugins – or the freedom to write your own.",
      painpoint: "Don't be limited by rigid testing frameworks that don't fit your needs.",
      image: "config.avif",
      darkImage: "config-dark.avif",
      alt: "A FirmwareCI test file shown as YAML (Smoke: Boot Time) — flashing the image, powering the board, and asserting boot within 80 seconds.",
      bg: "white",
      links: [
        {
          label: "Check out our testfile reference",
          url: "https://docs.firmware-ci.com/references/1_test_files/index.html",
        },
      ],
    },
    {
      id: "updates",
      headline: "Set up your Testing in Minutes, not Hours",
      text: "Say goodbye to complicated and time-consuming testing setups. FirmwareCI streamlines the entire process, from configuring your test environment to running your first test. Whether you're integrating with your CI/CD pipeline or deploying on real hardware, FirmwareCI gets you up and running in minutes. No steep learning curves—just seamless testing automation.",
      painpoint: "Configuring firmware tests is often a time-intensive process, requiring manual setup of hardware, tools, and workflows.",
      image: "setup.avif",
      alt: "A firmware device under test on the bench, a probe attached to a running board with its status LEDs lit.",
    },
    {
      headline: "Hardware connects us",
      text: "We have developed open-source tooling to access and control the device under test! Feel free to use our tooling with FirmwareCI, or rely on your own. It's your hardware and your choice!",
      painpoint: "No vendor lock-in: maintain control over your hardware and testing infrastructure.",
      image: "devices.avif",
      darkImage: "devices-dark.avif",
      alt: "The FirmwareCI devices view listing the connected devices under test and their current state.",
    },
    {
      headline: "Leveraging AI",
      text: "There are more benefits of automated firmware testing to come: To extend your test suite, there is no need to write more test manually. FirmwareCI will learn from your test results and suggest new tests to you. Just tell FirmwareCI 'Add a CPU load test and check the power consumption' and take advantage of top trending AI technologies.",
      painpoint: "End the tedious task of manually writing and maintaining test cases.",
      image: "ai.avif",
      alt: "A processor with glowing data pathways, representing AI-assisted test generation.",
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
