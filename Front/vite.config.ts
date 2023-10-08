import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// import { theme } from 'antd';
// import { convertLegacyToken } from '@ant-design/compatible';

// const { defaultAlgorithm, defaultSeed } = theme;

// const mapToken = defaultAlgorithm(defaultSeed);
// const v4Token = convertLegacyToken(mapToken);

import { theme } from 'antd';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);

const modifyVars = {
  '@primary-color': '#536DFE',
  '@title-color': '#372E5B',
  // '@white': '#fff',
  '@error': '#ff3e27',
  '@success': '#37b184',
  '@warning': '#ffb413',
  '@pale-grey': '#ECF2F7',
  '@background': '#f9fafa',
  '@title-black': '#000',
  '@secondary-text': '#687c8a',
  '@placeholder': '#b3bdc5',
  '@brandcolor-yellow': '#ffe600',
  '@icon': '#8e9ca8',
  '@border': '#d9dee2',
  '@grey': '#f5f7f7',
  '@disable': '#ccc',
  '@gray-white': '#d2e1ff',
  '@gray': '#425b6d',
  '@antdTableHoverBlue': '#f0f6ff',
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 9081,
    proxy: {
      '/v1': {
        target: 'http://localhost:5000/',
        changeOrigin: false,
      },
    },
  },
  resolve: {
    alias: [
      // https://github.com/vitejs/vite/issues/2185
      { find: /^~/, replacement: '' },
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: false,
        modifyVars: modifyVars,
      }
    },
  },
})