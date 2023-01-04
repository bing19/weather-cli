#!/usr/bin/env node
import { getArgs } from "./utils.js"
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js'
import { saveKeyValue, getValue, TOKEN_DICTIONARY } from "./services/save.service.js"
import { getWeather, getIcon } from "./services/api.service.js"

const saveToken = async(token) => {
    if(!token.length) {
        printError('Не передан token [API_KEY]')
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    }catch(e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if(!city.length) {
        printError('Не передан город')
        return
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранен')
    } catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getValue(TOKEN_DICTIONARY.city)

        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        if(e?.response?.status == 404) {
            printError('Город введен неверно')
        }

        if(e?.response?.status == 401) {
            printError('Токен введен неверно')
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