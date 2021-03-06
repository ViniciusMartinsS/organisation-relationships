module.exports = {
  'parser': '@typescript-eslint/parser',
  'extends': [
    'plugin:@typescript-eslint/recommended'
  ],
  'rules': {
    'camelcase': [
      0
    ],
    'indent': [
      2,
      2,
      {
        'SwitchCase': 1
      }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'eqeqeq': [
      'error',
      'always'
    ],
    'no-else-return': [
      'error',
      {
        'allowElseIf': false
      }
    ],
    'no-multi-spaces': 'error',
    'no-new-wrappers': 'error',
    'no-redeclare': 'error',
    'no-undef-init': 'error',
    'no-use-before-define': [
      'error',
      {
        'functions': false
      }
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'comma-style': [
      'error',
      'last'
    ],
    'no-implied-eval': 'error',
    'no-mixed-operators': 'off',
    'promise/no-callback-in-promise': 'off',
    'promise/no-nesting': 'off',
    'max-len': [
      'error',
      {
        'code': 120,
        'tabWidth': 2,
        'comments': 100,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true
      }
    ],
    'max-lines': [
      'error',
      {
        'max': 350,
        'skipBlankLines': true,
        'skipComments': true
      }
    ],
    'complexity': [
      'error',
      {
        'max': 20
      }
    ],
    'prefer-arrow-callback': [
      'error',
      {
        'allowNamedFunctions': false,
        'allowUnboundThis': true
      }
    ],
    'arrow-parens': [
      2,
      'as-needed'
    ],
    'dot-notation': [
      'error',
      {
        'allowKeywords': true
      }
    ],
    'require-atomic-updates': 'error',
    'no-regex-spaces': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable': 'error',
    'no-return-await': 'error',
    'no-return-assign': 'error',
    'no-unused-expressions': 'error',
    'no-useless-return': 'error',
    'no-throw-literal': 'error',
    'handle-callback-err': 'error',
    'key-spacing': [
      'error',
      {
        'beforeColon': false,
        'afterColon': true,
        'mode': 'strict'
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'no-unneeded-ternary': 'error',
    'prefer-object-spread': 'error',
    'array-callback-return': 'error',
    'arrow-body-style': [
      'error',
      'as-needed'
    ],
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/no-parameter-properties': 2,
    '@typescript-eslint/explicit-member-accessibility': 2,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    'brace-style': 2,
    'semi': 'error'
  }
};
