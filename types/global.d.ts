
declare global {
  interface Window {
    readConfig: () => unknown
    services: {
      /**
       * 读取文件内容
       * @param file 文件路径
       * @returns 文件内容
       */
      readFile: (file: string) => string
      /**
       * 将文本内容写入到下载目录
       * @param text 要写入的文本内容
       * @returns 写入的文件路径
       */
      writeTextFile: (text: string) => string
      /**
       * 将Base64格式的图片写入到下载目录
       * @param base64Url Base64格式的图片数据
       * @returns 写入的文件路径，如果格式不正确则返回undefined
       */
      writeImageFile: (base64Url: string) => string | undefined
    }
  }
}



export { }