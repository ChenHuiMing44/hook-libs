import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import path from "path";


export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(fileURLToPath(import.meta.url))

//一些统配的后缀 其他的如css 之类的全部忽略 其实用 vite 只有js 之类的后缀可以省略
export const defaultExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'vue']


export const __root = path.join(__dirname, "../src")
