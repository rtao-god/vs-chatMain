/** @type {import('next').NextConfig} */

module.exports = (phase, { defaultConfig }) => {
  if ('sassOptions' in defaultConfig) {
    defaultConfig['sassOptions'] = {
      includePaths: ['./'],
      prependData: `@import "@/css/include.scss";`,
    }
  }
  return defaultConfig
}
