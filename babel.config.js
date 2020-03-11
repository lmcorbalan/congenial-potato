module.exports = function(api) {
  api.cache(true)

  const presets = [
    [
      '@babel/env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/typescript'
  ]

  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-numeric-separator',
    '@babel/proposal-object-rest-spread'
  ]

  return {
    presets,
    plugins
  }
}
