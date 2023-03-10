#!/usr/bin/env node
import { getArgs } from "./utils.js"
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js'
import { saveKeyValue, getValue, TOKEN_DICTIONARY } from "./services/save.service.js"
import { getWeather, getIcon } from "./services/api.service.js"

const saveToken = async(token: String) => {
    if(!token.length) {
        printError(new Error('Не передан token [API_KEY]'))
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    }catch(e: any) {
        printError(e.message)
    }
}

const saveCity = async (city: String) => {
    if(!city.length) {
        printError(new Error('Не передан город'))
        return
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранен')
    } catch (e: any) {
        printError(new Error(e.message))
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getValue(TOKEN_DICTIONARY.city)

        const weather = await getWeather(city)
        const icon = weather.icon
    
        printWeather(weather, getIcon(icon))
    } catch (e: any) {
        if(e?.response?.status == 404) {
            printError(new Error('Город введен неверно'))
        }

        if(e?.response?.status == 401) {
            printError(new Error('Токен введен неверно'))
        }

        printError(e.message)
    }
    
}

const initCLI = () => {
    const args = getArgs(process.argv) 

    if(args.h) {
        //Вывести Help
        printHelp()
    }

    if(args.t) {
        // Сохранить Token
        return saveToken(args.t)
    }

    if(args.s) {
        // Сохранить Город
        return saveCity(args.s)
    }

    getForecast()

    // console.log(process.env)
}

initCLI()