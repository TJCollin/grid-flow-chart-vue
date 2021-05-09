import os from "os";
const getIp = () => {
  const networks = os.networkInterfaces();
  let found = "127.0.0.1";
  Object.keys(networks).forEach((k) => {
    let n = networks[k];
    n.forEach((addr) => {
      if (addr.family === "IPv4" && !addr.internal) {
        found = addr.address;
      }
    });
  });
  return found;
};

module.exports = {
  lang: "zh",
  base: "/grid-flow-chart-react/docs/",
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/en/": {
      lang: "en-US",
      title: "Grid Flow Chart",
      description: "A small-size plugin for building flow chart",
    },
    "/zh/": {
      lang: "zh",
      title: "Grid Flow Chart",
      description: "轻量化流程图插件",
    },
  },

  themeConfig: {
    logo: "/images/grid.png",
    repo: "https://github.com/TJCollin/grid-flow-chart-react/",
    repoLabel: "GitHub",
    locales: {
      "/zh/": {
        home: "/zh/",
        backToHome: "/zh/",
        sidebarDepth: 5,
        selectLanguageName: "简体中文",
        selectLanguageText: "选择语言",
        lastUpdatedText: "上次更新",
        lastUpdated: true,
        editLinkText: "在 GitHub 上编辑此页",
        sidebar: {
          "/zh/guide/": [
            {
              isGroup: true,
              text: "指南",

              children: [
                "/zh/guide/README.md",
                "/zh/guide/installation.md",
                "/zh/guide/api.md",
              ],
            },
          ],
        },
      },
      "/en/": {
        selectLanguageName: "English",
        selectLanguageAriaLabel: "English",
        selectLanguageText: "Languages",
        lastUpdatedText: "Last Updated",
        lastUpdated: true,
        editLinkText: "Edit this page on GitHub",
        home: "/en/",
        backToHome: "/eh/",

        sidebar: {
          "/en/guide/": [
            {
              isGroup: true,
              text: "Guide",
              children: [
                "/en/guide/README.md",
                "/en/guide/installation.md",
                "/en/guide/api.md",
              ],
            },
          ],
        },
      },
    },
  },
  define: {
    LOCAL_IP: getIp(),
  },
};
