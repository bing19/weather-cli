import { homedir } from "os"
import path from "path"
import { PathLike, promises } from 'fs'

type ResultType = {
    [key: string]: any
};

const filePath = path.join(homedir(), 'wether-data.json')

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}



export const saveKeyValue = async (key: any, value: String) => {
    let data: ResultType = {}

    if (await isExist(filePath)) {
        // Тут может быть ошибка при чтении файла
        const file = await promises.readFile(filePath).catch(e => {
            throw new Error('File not Found')
        })

        // Здесь может неверно пройти парсинг, если в файле что-то не то
        data = JSON.parse(file.toString())
    }

    data[key] = value

    // Здеть может не осуществиться запись
    await promises.writeFile(filePath, JSON.stringify(data))
}

export const getValue = async (key: any) => {

    if (await isExist(filePath)) {
        // Тут может быть ошибка при чтении файла
        const file = await promises.readFile(filePath)

        // Здесь может неверно пройти парсинг, если в файле что-то не то
        const data = JSON.parse(file.toString())

        return data[key]
    }

    return undefined
}

const isExist = async (path: PathLike) => {
    try{
        await promises.stat(path)
        return true
    }catch(e) {
        return false
    }
}