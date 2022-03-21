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
    href: "https://stackoverflow.com/users/10994912/lucifer-uchiha?tab=profile",
  },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "George R.",
  tagline: "Dinosaurs are cool", // this can be referenced in react code
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

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "recipes",
        path: "recipes",
        routeBasePath: "recipes",
        sidebarPath: require.resolve("./sidebarsRecipes.js"),
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
      },
      navbar: {
        title: "George Rowlands",
        logo: {
          alt: "George Rowlands Logo",
          src: "img/blackLogo.png",
          srcDark: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Digital Garden",
          },

          { to: "/", label: "Projects", position: "right" },
          { to: "/", label: "About", position: "right" },
          {
            to: "/recipes/intro", // To highlight the navbar item, you must link to a document, not a top-level directory
            position: "right",
            label: "Recipes",
            activeBaseRegex: `/recipes/`,
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
                html: `<a href="https://www.buymeacoffee.com/georgerowlands" target="_blank"><img src="https://raw.githubusercontent.com/LuciferUchiha/digital-garden-v2/main/static/img/buyMeACoffeePurple.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;"></a>`,
              },
              {
                label: "Privacy Policy",
                href: "/privacy-policy",
              },
            ],
          },
        ],
        copyright: `Last updated on ${new Date().toUTCString()}`,
      },
      prism: {
        theme: darkCodeTheme,
      },
    }),
};

module.exports = config;
