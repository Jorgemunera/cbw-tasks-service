import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser }, ignorePatterns: ['node_modules/', 'dist/', 'package.json', 'package-lock.json'], },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" }, ignorePatterns: ['node_modules/', 'dist/', 'package.json', 'package-lock.json'], },
]);
