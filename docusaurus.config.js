// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const mySocials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/georgerowlands/",
  },
  {
    label: "Github",
    href: "https://github.com/LuciferUchiha",
  },
  {
    label: "StackOverflow",
    href: "https://stackoverflow.com/users/10994912/lucifer-uchiha?tab=profile"
  },
]

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "My Site",
  tagline: "Dinosaurs are cool",
  url: "https://georgerowlands.ch",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.png",
  organizationName: "george-rowlands", // Usually your GitHub org/user name.
  projectName: "digital-garden-v2", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/LuciferUchiha/digital-garden-v2/tree/main",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "George Rowlands",
        logo: {
          alt: "George Rowlands Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/LuciferUchiha/digital-garden-v2",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Socials",
            items: mySocials,
          },
          {
            title: "Other",
            items: [
              {
                html: `<a href="https://www.buymeacoffee.com/georgerowlands" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>`,
              },
              {
                label: "Privacy Policy",
                href: "/privacy-policy",
              },
            ],
          },
        ],
        copyright: `Last updated on ${new Date().toDateString()}`
      },
      prism: {
        theme: darkCodeTheme,
      },
    }),
};

module.exports = config;
