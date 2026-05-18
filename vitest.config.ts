import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Включаем нативную поддержку tsconfig aliases
    tsconfigPaths: true,
  },
  test: {
    environment: 'node',
    globals: true,
  },
});
