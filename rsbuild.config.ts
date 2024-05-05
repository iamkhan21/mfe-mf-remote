import { defineConfig, RsbuildPlugins } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginCssMinimizer } from "@rsbuild/plugin-css-minimizer";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import { BundlerPluginInstance } from "@rsbuild/shared";
// import { dependencies } from "./package.json";
// import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig((env) => {
  const isProduction = env.envMode === "production";

  let rsbuildPlugins: RsbuildPlugins = [];
  let rspackPlugins: BundlerPluginInstance[] = [];

  if (process.env.RSDOCTOR) {
    rspackPlugins.push(new RsdoctorRspackPlugin({}));
  }

  if (isProduction) {
    rsbuildPlugins.push(
      pluginCssMinimizer({
        pluginOptions: {
          minimizerOptions: {
            preset: "advanced",
          },
        },
      }),
    );
  }

  return {
    server: {
      port: 5174,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    dev: {
      assetPrefix: "http://localhost:5174",
    },
    output: {
      assetPrefix: "http://localhost:5174",
    },
    tools: {
      rspack: (config, { appendPlugins }) => {
        const moduleName = "uspm";
        config.output!.uniqueName = moduleName;

        appendPlugins([
          // new ModuleFederationPlugin({
          //   name: moduleName,
          //   exposes: {
          //     "./UserCard": "./src/features/UserCard",
          //   },
          //   shared: {
          //     react: {
          //       singleton: true,
          //       requiredVersion: dependencies["react"],
          //     },
          //     "react-dom": {
          //       singleton: true,
          //       requiredVersion: dependencies["react-dom"],
          //     },
          //   },
          // }),
          ...rspackPlugins,
        ]);
      },
    },
    plugins: [pluginReact(), ...rsbuildPlugins],
  };
});
