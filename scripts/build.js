import { buildSync } from "esbuild";

const distDir = "dist";
const srcPath = "src/main.ts";

// Build all formats
const formats = [
    {
        format: "iife",
        globalName: "kaboomExtra",
        outfile: `${distDir}/kaboom-extra.js`,
        footer: {
            js: "window.kaboomExtra = kaboomExtra.default",
        },
    },
    { format: "cjs", outfile: `${distDir}/kaboom-extra.cjs` },
    { format: "esm", outfile: `${distDir}/kaboom-extra.mjs` },
];

const config = {
    bundle: true,
    sourcemap: true,
    minify: true,
    keepNames: true,
    loader: {
        ".png": "dataurl",
        ".glsl": "text",
        ".mp3": "binary",
    },
    entryPoints: [ srcPath ],
};

formats.forEach((fmt) => {
    buildSync({
        ...config,
        ...fmt,
    })
});