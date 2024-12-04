// @ts-check

import { defineConfig } from '@vben/eslint-config';

export default defineConfig({
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
});
