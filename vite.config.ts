import { defineConfig } from "vite";
import path from "path"
import { assetpackPlugin } from "./scripts/assetpack-vite-plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [assetpackPlugin()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@app": path.resolve(__dirname, "./src/app"),
            "@engine": path.resolve(__dirname, "./src/engine"),
            "@popups": path.resolve(__dirname, "./src/app/popups"),
            "@screens": path.resolve(__dirname, "./src/app/screens"),
            "@ui": path.resolve(__dirname, "./src/app/ui"),
            "@utils": path.resolve(__dirname, "./src/app/utils"),
            "@engine-utils": path.resolve(__dirname, "./src/engine/utils"),
            "@types": path.resolve(__dirname, "./src/types.ts"),
            "@config": path.resolve(__dirname, "./src/config.ts")
        },
    },
    optimizeDeps: {
        include: ["pixi-filters"],
    },
    server: {
        port: 8080,
        open: true,
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});
