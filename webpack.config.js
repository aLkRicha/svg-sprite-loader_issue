const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob').sync;
const path = require('path');

const config = {
  entry: {
    sprite: glob('./svg/*.svg')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },

  resolve: {
    alias: {
      ['test']: __dirname
    }
  },

  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'svg'),
        use: [
          'file-loader',
          {
            loader: 'svg-sprite-loader',
            options: {
                extract: false,
                // spriteModule: 'svg-sprite-loader/runtime/sprite.build',
            }
          },
          {
            loader: 'svgo-loader',
            options: {
                plugins: [
                  { convertPathData:
                    {
                      floatPrecision: 0,
                      transformPrecision: 0,
                    }
                  },
                  { cleanupListOfValues:
                    {
                      floatPrecision: 0
                    }
                  },
                ]
            }
          },
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new SpriteLoaderPlugin({ plainSprite: true })
  ]
};

module.exports = config;
