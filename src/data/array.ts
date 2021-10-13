/**
 * @param  {T[]} arr 对象的数组
 * @param  {string} key 列名称
 * @description 提取数组某一行
 */
export function columnData<T = unknown>(arr: T[], key: string) {
    return arr.map(it => it[key])
}


interface rows2columnsOptions {
    newColumns?: string[],//新列顺序
    originColumns?: string[],//原列顺序
}

/**
 * @param  {T[]} arr
 * @param  {rows2columnsOptions} columns
 */
export function rows2columns<T = unknown>(arr: T[], columns: rows2columnsOptions = {}) {
    const ret = []
    const _obj = arr[0]
    const originCol = columns.originColumns || Object.keys(_obj)
    originCol.forEach((key) => {
        const newCol = columns.newColumns || [];
        const newArr = columnData(arr, key)
        if (newCol.length == 0) {
            ret.push(Object.assign({}, newArr))
        }
        else {
            const newObj = {}
            for (const index in newArr) {
                newObj[newCol[index]] = newArr[index]
            }
            ret.push(newObj)
        }
    })
    return ret
}


/**
 * @param  {[]} arr 一个数组
 * @param  {string} key? 假如是对象数组，则传入要去重的key值
 * @description 数组去重
 */
export function unique<T = unknown>(arr: T[], key?: string) {
    const seen = new Map()
    if (!key) return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
    return arr.filter((a) => !seen.has(a[key]) && seen.set(a[key], 1))
}