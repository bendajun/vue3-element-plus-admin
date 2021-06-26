/**
  * 导入指定上下文中所有模块的默认导出，导出结果以文件名为key，默认导出为value
  * @param {RequireContext} modulesFiles 由webpack提供的require.context方法返回的上下文
  * @param {Boolean} bAllExport 是否导出模块中所有export内容，默认只导出export default
  */
export function importAll(modulesFiles, bAllExport = false) {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => { // modulesFiles.keys()是一个文件名数组
    // 排除index.js文件
    if (modulePath.includes('index.js')) { // 排除index.js
      return modules
    }
    // 以文件名为key
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath) // value就是文件名对应的模块
    modules[moduleName] = bAllExport ? {
      ...value,
    } : value.default
    return modules
  }, {})
  return modules
}

/**
 * 设置文档标题，路由名 - 系统名
 * @param {string} title 文档标题
 */
export function setDocumentTitle(title) {
  document.title = title || process.env.VUE_APP_TITLE
}

/** 数组扁平化处理
 * @param {Array} arr 需要扁平化的对象数组，如 [{},{ children: [{}] }]
 */
export function flatArray(arr) {
  let flatArr = []
  arr.forEach(item => {
    flatArr.push({ ...item })
    if (item.children && item.children.length !== 0) {
      flatArr.push(
        ...flatArray(item.children)
      )
    }
  })
  return flatArr
}
