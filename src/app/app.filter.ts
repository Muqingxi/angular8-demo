/**
 * @description 日期格式化 dateFormat(date, fmt)
 */
export const dateFormat = (date, fmt = 'yyyy-MM-dd') => {
    if (date) date = (date instanceof Date) ? date : new Date(date)
    else return ''
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
        }
    })
    return fmt
}

export const filterMenu = (menu) => {
    for (let i = 0; i < menu.length; i++) {
        if (!menu[i].data) {
            menu.splice(i, 1)
            i--
        } else {
            if (menu[i].children) {
                filterMenu(menu[i].children)
            }
        }
    }
}

export const filterItem = (source = [], keyName, keyValue, childName) => {
    let keyArr = keyName && keyName.split('.')
    for (let i = 0; i < source.length; i++) {
        let obj = source[i]
        for (let i = 0; i < keyArr.length; i++) {
            obj = obj[keyArr[i]]
        }
        if (obj === keyValue) {
            return source[i]
        } else {
            let child = source[i][childName]
            if (Array.isArray(child) && child.length > 0) {
                let result = filterItem(child, keyName, keyValue, childName)
                if (result) return result
            }
        }
    }
}

export const getParamsUrl = (url: String, params: Object): String => {
    let _url = url + '?'
    for (let key in params) {
        _url += `${key}=${params[key]}&`
    }
    return _url.substring(0, _url.length - 1)
}

// export const isObjectEqual = (a, b) => {
//     var aProps = Object.getOwnPropertyNames(a)
//     var bProps = Object.getOwnPropertyNames(b)

//     if (aProps.length != bProps.length) {
//         return false
//     }

//     for (var i = 0; i < aProps.length; i++) {
//         var propName = aProps[i]

//         if (a[propName] !== b[propName]) {
//             return false
//         }
//     }

//     return true
// }

export const getData = (state, parent) => {
    let data = []
    if (parent && parent.snapshot.data) {
        data.push(parent.snapshot.data)
    }

    if (state && parent) {
        data.push(...getData(state, state.firstChild(parent)))
    }
    return data
}