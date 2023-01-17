// import https from 'https'
import axios from 'axios'
import { getValue, TOKEN_DICTIONARY } from './save.service.js'
import * as dotenv from 'dotenv'
import { Weather } from '../interface/weather.interface.js'

dotenv.config()

export const getIcon = (icon: String): any => {
    switch(icon.slice(0, -1)) {
        case '13': 
            return '🌨'
        case '01':
            return '☀️'
        case '02':
            return '🌤'
        case '03':
            return '⛅️'
        case '04':
            return '🌥️'
        case '05':
            return '☁️'
        case '06':
            return '🌦'
        case '07':
            return '🌧'
        case '08':
            return '⛈'
        case '09':
            return '🌩'
        case '10':
            return '🌧'
        default:
            return ''
    }
}

export const getWeather = async (city: String): Promise<Weather> => {
    const token = process.env.TOKEN ?? await getValue(TOKEN_DICTIONARY.token)

    if(!token) {
        throw new Error('Не задан ключ API, задайте через команду -t [API_KEY]')
    }
    
    const { data } = await axios('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric',
            limit: 1
        }
    })

    const weather = {
        name: data.name,
        temp: data.main.temp,
        feel: data.main.feels_like,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        clouds: data.clouds.all,
        icon: data.weather[0].icon
    }

    return weather 
    // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    // url.searchParams.append('q', city)
    // url.searchParams.append('appid', token)
    // url.searchParams.append('lang', 'ru')
    // url.searchParams.append('unuts', 'metric')
    // url.searchParams.append('limit', 1)

    // https.get(url, (response) => {
    //     let result = ''

    //     response.on('data', (chunk) => {
    //         result += chunk
    //     })

    //     response.on('end', () => {
    //         console.log(result)
    //     })

    //     response.on('error', (e) => {

    //     })
    // })
}