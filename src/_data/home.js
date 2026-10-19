const docs = "https://docs.firmware-ci.com";

export default {
  /*
   * The feature area of the homepage (pages/index.njk), in this order:
   *
   * 1. `dutctl` (partials/sections/dutctl.njk): our free, open-source
   *    Hardware Abstraction Layer, next to what the whole FirmwareCI system
   *    adds on top. Each of those points links down to the section that
   *    tells more.
   * 2. `featureSections` (partials/text-image.njk): one section per feature
   *    scene of the hero loop, in the loop's order. `scene` is the key of that
   *    scene in _data/heroLoop.js; its "Learn more" link points at `id`.
   *
   * Wording: the layer that powers, flashes and reaches the boards in a lab
   * is the "Hardware Abstraction Layer", always written out (never "HAL").
   * dutctl is our Hardware Abstraction Layer; a customer's existing lab
   * control is theirs. FirmwareCI works on top of either.
   *
   * Copy may contain inline HTML: links to other sections, <b> and <code>.
   */
  dutctl: {
    id: "dutctl",
    scene: "dutctl",
    headline: "Start free with dutctl",
    repo: "https://github.com/BlindspotSoftware/dutctl",
    docs: `${docs}/usage/11_connecting_hardware/index.html`,
    does: [
      "One command line for every board: power, flash, serial console and more.",
      "An agent on a small computer next to your boards, such as a Raspberry Pi, makes them reachable over the network.",
      "Modules for GPIO, IPMI, PDUs and Wi-Fi sockets, SPI flashing and flash emulation, serial, file transfer, shell and SSH. Need more? Write your own in Go.",
      "Locks a board while it is in use, so people and pipelines don't collide.",
    ],
    // What the whole system adds: one point per feature section below.
    fwci: [
      {
        href: "#every-commit",
        title: "Every commit, on real hardware",
        text: "Each push is flashed, booted and tested on a free board, hands-off. All it needs is the firmware binary, not your source code.",
      },
      {
        href: "#test-steps",
        title: "A library of test steps, and custom ones",
        text: "Ready to use, from shell commands to security checks and BMC conformance tests. We build the steps you are missing.",
      },
      {
        href: "#tests-as-code",
        title: "Part of your workflow",
        text: "Tests live in your repo, results land on your pull requests, and the fwci CLI runs a test from your laptop.",
      },
      {
        href: "#labs",
        title: "Your lab, ours, or both",
        text: "Jobs queue by priority and reserve a free board: hosted, on-site or air-gapped.",
      },
      {
        href: "#ai",
        title: "In your AI assistant",
        text: "Over MCP, it reads jobs and logs, explains failures and checks your tests.",
      },
    ],
  },

  featureSections: [
    {
      id: "every-commit",
      scene: "pipeline",
      headline: "Every commit, on real hardware",
      text: "Your build hands the new firmware image to FirmwareCI. It picks a free board of the right kind, flashes and boots it, runs your tests and reports back. No one has to touch the hardware.",
      points: [
        '<b>Binary only.</b> FirmwareCI needs the firmware image, not your source code. It tests the binary you ship from the outside, a <a href="/blog/the-practical-advantage-black-box-testing-with-firmwareci/">black-box approach</a> that works for open-source and proprietary firmware alike.',
        '<b>Flash and boot.</b> Each board comes with a pre-stage that gets it ready: power off, flash the image, power on, wait for the boot banner. It runs through the <a href="#dutctl">Hardware Abstraction Layer</a>, dutctl or your own.',
        '<b>Test.</b> Your <a href="#test-steps">test steps</a> run stage by stage, each with its own timeout.',
        '<b>Report.</b> The result lands on your <a href="#tests-as-code">pull request</a> and in the dashboard, with every log.',
      ],
      painpoint: "No more flashing by hand, waiting for the bench, or bugs found weeks later.",
      links: [{ label: "Write a boot test", url: `${docs}/usage/4_boot_test/index.html` }],
      image: "screenshot.avif",
      darkImage: "screenshot-dark.avif",
      alt: "A FirmwareCI request expanded to show its jobs running on an HPE ProLiant DL320 — boot, console, inventory, sensor and smoke tests, all passing.",
      bg: "white",
    },
    {
      id: "test-steps",
      scene: "tests",
      headline: "Test what servers live on",
      text: "A test is a list of steps, taken from a library of ready-made test steps: from a single shell command to complete test suites. Servers are where FirmwareCI comes from, but nothing ties it to them: the steps work with any hardware and its firmware.",
      points: [
        "<b>Firmware and security:</b> BIOS settings, Secure Boot, BIOS certificates, firmware version, CHIPSEC, binary analysis and vulnerability scans",
        "<b>BMC and management:</b> Redfish and IPMI API conformance tests, and custom BMC test suites",
        "<b>Stress and performance:</b> CPU load and statistics, stress tests and benchmarks",
        '<b>Building blocks:</b> DUTCTL, Shell, Command, Ping, QEMU, PiKVM, Robot Framework. DUTCTL drives the board through dutctl, our <a href="#dutctl">Hardware Abstraction Layer</a>; Shell, Command or PiKVM drive the one you already have.',
      ],
      callout: {
        title: "Missing a step?",
        text: "We develop custom test steps for you, and the hardware integration behind them.",
      },
      links: [
        { label: "All test steps", url: `${docs}/references/2_commands/index.html` },
        { label: "Ask for a custom step", url: "/contact/" },
      ],
      image: "config.avif",
      darkImage: "config-dark.avif",
      alt: "The test file “Smoke: Boot Time” in FirmwareCI: dutctl steps power the board off, load the new image into the flash emulator, power it on and wait up to 80 seconds for the boot banner on the serial console; a ping step then waits for SSH.",
      bg: "white",
    },
    {
      id: "tests-as-code",
      scene: "tests-as-code",
      headline: "Tests as code, in your repo",
      text: "Tests, boards and storage are YAML files in a <code>.firmwareci</code> folder next to your firmware, versioned and reviewed like the code they test. Results come back where you review it: on GitHub, GitLab or Gerrit.",
      points: [
        "<b>Pull requests:</b> FirmwareCI checks the configuration on every pull request and posts the test results as a comment. GitLab merge requests get a comment and a status.",
        "<b>CI pipelines:</b> the firmwareci action hands over the images your GitHub Actions or GitLab CI job just built.",
        '<b>Your terminal:</b> <code>fwci exec</code> runs a test on real hardware from your laptop, before you commit it. <code>fwci validate</code> checks your files, and so can your <a href="#ai">AI assistant</a>.',
        "<b>Everything else:</b> a REST API starts jobs from any other system.",
      ],
      painpoint: "No context switching: results show up where you review code.",
      links: [
        { label: "Test file reference", url: `${docs}/references/1_test_files/index.html` },
        { label: "Ways to run a job", url: `${docs}/usage/5_job_triggers/index.html` },
      ],
      image: "integration.avif",
      darkImage: "integration-dark.avif",
      alt: "A GitHub Actions run: a build matrix produces firmware images for two targets, then one FirmwareCI job per target tests them. Everything passes.",
      bg: "white",
    },
    {
      id: "labs",
      scene: "labs",
      headline: "Your lab, our lab, or both",
      text: "It doesn't matter where a board sits, or what kind of board it is. Keep your hardware in your own lab, connect a remote lab over VPN, let us host it, or mix all three.",
      points: [
        "<b>Hosted by us:</b> your boards run in our lab, including the hardware modifications and setup.",
        "<b>On-site:</b> FirmwareCI runs in your own infrastructure, air-gapped if it has to be.",
        "<b>Scheduling:</b> a workflow asks for a kind of board, not a specific one. Jobs queue by priority and run on the next free match.",
        '<b>Reservation:</b> a board is locked while a job runs, through <a href="#dutctl">dutctl</a> or your own reservation system, so people and pipelines don\'t collide.',
      ],
      painpoint: "No vendor lock-in: your hardware, your network, your choice.",
      links: [{ label: "Hosted and on-site plans", url: "/pricing/" }],
      image: "lab.avif",
      darkImage: "lab-dark.avif",
      alt: "A rack in a test lab: shelf after shelf of boards, each one wired up and powered.",
      bg: "white",
    },
    {
      id: "ai",
      scene: "ai",
      headline: "Ask your AI why it failed",
      text: "FirmwareCI comes with an MCP server: connect the AI assistant you already use, such as Claude Code, Cursor, VS Code with Copilot, Codex or OpenCode, and it can look into your jobs, logs and boards.",
      points: [
        "<b>Failures, sorted:</b> FirmwareCI's AI rates every failed job as a real fault, a small mismatch or a lab problem, with a one-line summary and the evidence.",
        "<b>Explain a failure:</b> your assistant finds the failing step, reads its logs and names the root cause, so you know whether to look at the lab or at your firmware.",
        "<b>Write tests faster:</b> it looks up schemas and examples, validates a test file before you push, and converts your GitHub Actions or GitLab CI configuration.",
        "<b>Read-only by design:</b> it can look and check, but never start, change or delete anything.",
      ],
      painpoint: "Less time in logs, more time on the fix.",
      links: [{ label: "Connect your AI assistant", url: `${docs}/usage/10_mcp_server/index.html` }],
      // partials/visuals/chat.njk: the question and answer of the loop's AI scene
      visual: "chat",
      bg: "white",
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
