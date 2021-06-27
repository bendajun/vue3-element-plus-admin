import { importAll } from '@/utils'
export { default as SvgIcon } from '@/components/SvgIcon/Index.vue'

const modulesFiles = require.context('./svg', false, /\.svg$/)
const modules = importAll(modulesFiles)

// 必须导出，然后引入
export default Object.keys(modules)
