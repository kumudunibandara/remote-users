import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";


// https://vite.dev/config/
export default defineConfig({
  base: "/remote-users/",
  plugins: [
    react(),
    federation({
      name: "remoteApp",
      filename: "remoteEntry.js",
      remotes: {
        hostApp: "/host-app/assets/remoteEntry.js",
      },
      exposes: {
        "./Button": "./src/components/Button",
        "./UserManager": "./src/components/UserDatagrid",
      },
      shared: {
        "react": {},
        "react-dom": {},
        "@mui/material": {},
        "@mui/icons-material": {},
        "@emotion/react": {},
        "@emotion/styled": {},
        'ag-grid-enterprise': {},
        'ag-grid-community': {},
        'ag-grid-react': {},
        "react-redux": {},
        "@reduxjs/toolkit": {},
      },
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  preview: {
    port: 3000,
    strictPort: true,
    cors: true
  },

})