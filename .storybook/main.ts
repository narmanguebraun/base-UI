import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-styling",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y"
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;
