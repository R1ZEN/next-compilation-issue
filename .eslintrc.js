// const { GRAPHQL_URL } = require('./config/env');

module.exports = {
  root: true,
  extends: [
    './node_modules/@realtby/codestyle/eslint/prettier',
    './node_modules/@realtby/codestyle/eslint/base',
    './node_modules/@realtby/codestyle/eslint/typescript',
    './node_modules/@realtby/codestyle/eslint/import',
    './node_modules/@realtby/codestyle/eslint/react',
    // './node_modules/@realtby/codestyle/eslint/graphql',
    'plugin:@next/next/recommended',
  ],
  rules: {
    // import
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        pathGroups: ['components', 'lib', 'features'].map(dir => ({
          pattern: `${dir}/**`,
          group: 'external',
          position: 'after',
        })),
        'newlines-between': 'always',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*', '@sentry/**/*'],
        paths: [
          {
            name: 'next-rosetta',
            importNames: ['useI18n'],
            message: "Please use `import { useI18n } from 'lib/i18n';`",
          },
          {
            name: 'next-rosetta',
            importNames: ['I18nProvider'],
            message: "Please use `import I18nProvider from 'lib/i18n/provider';`",
          },
          {
            name: 'robot3',
            message: "Please use 'lib/fsm' wrapper",
          },
          {
            name: '@hookform/error-message',
            importNames: ['ErrorMessage'],
            message: "Please use `import ErrorMessage from 'components/form/error-message';`",
          },
          {
            name: 'react-hook-form',
            importNames: ['get'],
            message: "Please use `import { get } from 'lib/utils/helpers/get';`",
          },
          {
            name: 'react-hook-form',
            importNames: ['Controller'],
            message: "Please use `import Controller from 'components/form/fields/controller';`",
          },
          {
            name: 'next/image',
            message: "Please use `import StaticImage from 'components/ui/image/static`",
          },
          {
            name: 'react-input-mask',
            message: "Please use `import InputMask from 'components/ui/input/mask`",
          },
          {
            name: 'throttle-debounce',
            message: "Please use `import { throttle } from '@realt-by/lib/shared/utils/debounce",
          },
          {
            name: 'dset',
            message: "Please use `import set from 'lib/utils/helpers/set';`",
          },
          {
            name: 'react-yandex-maps',
            importNames: ['YMapsApi'],
            message: "Please use `import YMapsApi from 'components/ui/ya-map/core'",
          },
          {
            name: 'react-slidedown',
            message: "Please use `import SlideDown from 'components/slide-down`",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['./*.{js,ts}', '{pages,pages-archive,@types}/**/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  // overrides: [
  //   {
  //     files: ['*.gql'],
  //     parserOptions: {
  //       schema: GRAPHQL_URL,
  //       operations: ['features', 'lib', 'components'].map(dir => `./${dir}/**/*.gql`),
  //     },
  //   },
  // ],
};
