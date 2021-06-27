
import {
  importAll,
} from '@/utils'
const modulesFiles = require.context('./', true, /\.js$/)
const modules = importAll(modulesFiles)

export default (app) => {
  Object.entries(modules)
    .forEach(([key, directive]) => {
      app.directive(directive.name || key, directive)
    })
  return app
}
