export const hooks = {
  updateConfig(config) {
    // Amp snapshots retain the pnpm store as well as node_modules.
    if (process.env.AMP_ORB === '1') {
      config.enableGlobalVirtualStore = true;
    }
    return config;
  },
};
