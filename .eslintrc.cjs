const types = {
  ERROR: 'error',
  WARN: 'warn',
  OFF: 'off',
};

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': 'webpack',
  },
  rules: {
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'no-console': types.WARN,
    'no-template-curly-in-string': types.WARN,
    'require-atomic-updates': types.ERROR,
    'array-callback-return': types.ERROR,
    'block-scoped-var': types.WARN,
    'class-methods-use-this': types.ERROR,
    curly: [types.ERROR, 'all'],
    'default-case': types.ERROR,
    'default-param-last': types.OFF,
    'dot-location': [types.OFF, 'object'],
    'dot-notation': types.WARN,
    'grouped-accessor-pairs': [types.WARN, 'setBeforeGet'],
    'max-classes-per-file': [types.ERROR, 1],
    'no-constructor-return': types.WARN,
    'no-div-regex': types.WARN,
    'no-else-return': types.WARN,
    'no-implied-eval': types.WARN,
    'no-invalid-this': types.WARN,
    'no-iterator': types.WARN,
    'no-multi-spaces': types.ERROR,
    'no-new': types.WARN,
    'no-new-func': types.ERROR,
    'no-new-wrappers': types.ERROR,
    'no-param-reassign': types.ERROR,
    'no-return-assign': [types.ERROR, 'except-parens'],
    'no-return-await': types.ERROR,
    'no-script-url': types.WARN,
    'no-self-compare': types.ERROR,
    'no-sequences': types.ERROR,
    'no-unmodified-loop-condition': types.WARN,
    'no-useless-concat': types.WARN,
    'no-mixed-spaces-and-tabs': [types.ERROR, 'smart-tabs'],
    'no-useless-return': types.WARN,
    'no-extra-parens': types.OFF,
    'arrow-spacing': [types.ERROR],
    'no-duplicate-imports': types.ERROR,
    'no-useless-computed-key': types.WARN,
    'object-shorthand': [types.WARN, 'always'],
    'prefer-const': types.WARN,
    'prefer-rest-params': types.ERROR,
    'prefer-spread': types.ERROR,
    'import/order': types.WARN,
    'import/newline-after-import': types.ERROR,
    'react/prop-types': types.OFF,
    'react/react-in-jsx-scope': types.OFF,
    'func-call-spacing': [types.ERROR, 'never'],
    'prettier/prettier': [types.ERROR, { singleQuote: true }],
    '@typescript-eslint/ban-ts-comment': types.ERROR,
    '@typescript-eslint/ban-types': [
      types.ERROR,
      {
        types: {
          Number: {
            message: 'Use number instead',
            fixWith: 'number',
          },
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          Boolean: {
            message: 'Use boolean instead',
            fixWith: 'boolean',
          },
          Symbol: {
            message: 'Use symbol instead',
            fixWith: 'symbol',
          },
          Object: {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [types.WARN],
    '@typescript-eslint/explicit-member-accessibility': [types.ERROR],
    '@typescript-eslint/func-call-spacing': [types.ERROR, 'never'],
    '@typescript-eslint/no-for-in-array': types.ERROR,
    '@typescript-eslint/no-require-imports': types.ERROR,
    '@typescript-eslint/no-unnecessary-qualifier': types.ERROR,
    '@typescript-eslint/no-unnecessary-type-assertion': types.WARN,
    '@typescript-eslint/no-useless-constructor': types.OFF,
    '@typescript-eslint/no-explicit-any': types.OFF,
    '@typescript-eslint/interface-name-prefix': types.OFF,
    '@typescript-eslint/no-empty-interface': types.OFF,
    '@typescript-eslint/no-extraneous-class': types.OFF,
    '@typescript-eslint/explicit-function-return-type': types.OFF,
    '@typescript-eslint/no-empty-function': types.OFF,
    // 'react/button-has-type': [
    //   types.ERROR,
    //   {
    //     button: true,
    //     submit: true,
    //     reset: true,
    //   },
    // ],
  },
};
