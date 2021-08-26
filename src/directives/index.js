
import {
  importAll,
} from '@/utils'
const modulesFiles = require.context('./', true, /\.js$/)
const modules = importAll(modulesFiles)

export default (app) => {
  Object.entries(modules)
    .forEach(([key, directive]) => {
      console.log(directive, 333)
      app.directive(directive.name || key, directive.handler)
    })
  return app
}
