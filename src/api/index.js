import {
  importAll,
} from '@/utils'
import {
  camelCase,
} from 'change-case' // 文件名形式转换

const modulesFiles = require.context('./', true, /\.js$/)
const modules = importAll(modulesFiles, true)

const apis = {}
for (const key in modules) {
  apis[camelCase(key)] = modules[key] // 转换为驼峰 camelCase('test string') //=> "testString"
}
export default apis
