const pickFields = <T extends Record<string, any>, K extends keyof T>(queryObj: T, keys: K[]): Partial<T> => {
    const result: T = {} as T;
    keys.forEach(key => {
        queryObj[key] && (result[key] = queryObj[key])
    })
    return result;
}

export default pickFields;