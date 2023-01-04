import { homedir } from "os"
import path from "path"
import { promises } from 'fs'

const filePath = path.join(homedir(), 'wether-data.json')

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

export const saveKeyValue = async (key, value) => {
    let data = {}

    if (await isExist(filePath)) {
        // Тут может быть ошибка при чтении файла
        const file = await promises.readFile(filePath).catch(e => {
            throw new Error('File not Found')
        })

        // Здесь может неверно пройти парсинг, если в файле что-то не то
        data = JSON.parse(file)
    }

    data[key] = value

    // Здеть может не осуществиться запись
    await promises.writeFile(filePath, JSON.stringify(data))
}

export const getValue = async (key) => {

    if (await isExist(filePath)) {
        // Тут может быть ошибка при чтении файла
        const file = await promises.readFile(filePath)

        // Здесь может неверно пройти парсинг, если в файле что-то не то
        const data = JSON.parse(file)

        return data[key]
    }

    return undefined
}

const isExist = async (path) => {
    try{
        await promises.stat(path)
        return true
    }catch(e) {
        return false
    }
}