// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const math = require('remark-math');
const katex = require('rehype-katex');
const mermaid = require('mdx-mermaid');
const prismAdditionalLanguages = require('./prismLanguages');

const mySocials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/georgerowlands/',
  },
  {
    label: 'Github',
    href: 'https://github.com/LuciferUchiha',
  },
  {
    label: 'StackOverflow',
    href: 'https://stackoverflow.com/users/10994912/lucifer-uchiha?tab=profile',
  },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'George R.',
  tagline: 'Dinosaurs are cool', // this can be referenced in react code
  url: 'https://georgerowlands.ch',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'LuciferUchiha', // Usually your GitHub org/user name.
  projectName: 'georgerowlands.ch', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [math, mermaid],
          rehypePlugins: [katex],
          sidebarPath: require.resolve('./sidebars.js'),
          exclude: ['**/Presentations/**'],
          editUrl: 'https://github.com/LuciferUchiha/georgerowlands.ch/tree/main',
          admonitions: {
            customTypes: {
              example: 'info',
            },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-7C73QGFCVK',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'recipes',
        path: 'recipes',
        routeBasePath: 'recipes',
        sidebarPath: require.resolve('./sidebarsRecipes.js'),
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
    {
      href: 'https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css',
      type: 'text/css',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
      },
      navbar: {
        title: 'George Rowlands',
        logo: {
          alt: 'George Rowlands Logo',
          src: 'img/blackLogo.png',
          srcDark: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Digital Garden',
          },

          { to: 'projects/', label: 'Projects', position: 'right' },
          { to: 'about/', label: 'About', position: 'right' },
          {
            to: '/recipes/intro', // To highlight the navbar item, you must link to a document, not a top-level directory
            position: 'right',
            label: 'Recipes',
            activeBaseRegex: '/recipes/',
          },
          {
            href: 'https://github.com/LuciferUchiha/georgerowlands.ch',
            className: 'header-github-link',
            position: 'right',
          },
        ],
      },
      algolia: {
        appId: '17CW5I4GY9',
        apiKey: 'e0e81c9c8c55a38be2a1338a6921e95a',
        indexName: 'georgerowlands',
        searchPagePath: 'search',
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Socials',
            items: mySocials,
          },
          {
            title: 'Other',
            items: [
              {
                html: '<a href="https://www.buymeacoffee.com/georgerowlands" target="_blank"><img src="https://raw.githubusercontent.com/LuciferUchiha/digital-garden-v2/main/static/img/buyMeACoffeePurple.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;"></a>',
              },
              {
                label: 'Privacy Policy',
                href: '/privacy-policy',
              },
            ],
          },
        ],
        copyright: `Last updated on ${new Date().toUTCString()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: prismAdditionalLanguages,
      },
    }),
};

module.exports = config;
