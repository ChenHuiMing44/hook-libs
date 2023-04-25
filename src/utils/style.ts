

/**
 * @author: hm, 2022/10/16
 * des: 获取一个盒子的长度或者宽度 参数是 number 或者string
 */
export const getSizeStr = (size: number | string): string => isNaN(+size) ? `${size}` : `${+size}px`

