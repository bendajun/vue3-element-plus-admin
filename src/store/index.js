import { createStore } from 'vuex'
import { importAll } from '@/utils'

const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = importAll(modulesFiles)

export default createStore({
  modules,
})
