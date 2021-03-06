const RULES = {
    OFF: 'off',
    WARN: 'warn',
    ERROR: 'error',
    NEVER: 'never',
    ALWAYS: 'always'
}

module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'plugin:jest/recommended',
        'plugin:react/recommended',
        'standard'
    ],
    settings: {
        react: {
            version: 'detect'
        },
        jest: {
            version: 'detect'
        }
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react',
        'jest'
    ],
    rules: {
        'prefer-arrow-callback': RULES.WARN,
        'prefer-const': RULES.WARN,
        quotes: [2, 'single', 'avoid-escape'],
        indent: [RULES.ERROR, 4],
        'object-curly-spacing': [RULES.ERROR, RULES.ALWAYS],
        'space-in-parens': [RULES.ERROR, RULES.ALWAYS],
        'react/jsx-indent': [RULES.ERROR, 4],
        'react/jsx-indent-props': [RULES.ERROR, 4],
        'react/prop-types': RULES.OFF,
        'react/react-in-jsx-scope': RULES.OFF,
        'react/jsx-curly-spacing': [1, { when: RULES.ALWAYS }],
        'jest/no-disabled-tests': RULES.WARN,
        'jest/no-focused-tests': RULES.ERROR,
        'jest/no-identical-title': RULES.ERROR,
        'jest/prefer-to-have-length': RULES.WARN,
        'jest/valid-expect': RULES.ERROR
    }
}
