require('ignore-styles');
require('isomorphic-fetch');
require('canvas');

require('@babel/register')({
  ignore: [
    /(node_modules)/
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    ['babel-plugin-inline-import-data-uri', {extensions: ['.webp', '.jpg', '.gif', '.png']}],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-inline-react-svg'
  ]
});

require('./index');