import { defineConfig } from 'orval';

export default defineConfig({
  tutorCrmApi: {
    input: 'http://localhost:3000/api/docs-json',
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      schemas: 'src/api/model',
      client: 'react-query',
      override: {
        mutator: {
          path: 'src/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
