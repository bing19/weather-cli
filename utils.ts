type ResultType = {
    [key: string]: any
}

export const getArgs = (args: String[]) => {
    const res: ResultType = {}

    const [exec, file, ...rest] = args

    rest.forEach((value: String, index: number, arr: String[]) => {
        if(value.charAt(0) == '-') {
            if(index == arr.length - 1) {
                res[value.substring(1)] = true
            }
            else if(arr[index + 1].charAt(0) != '-') {
                res[value.substring(1)] = arr[index + 1]
            }
            else {
                res[value.substring(1)] = true
            }
        }
    });

    return res
}
