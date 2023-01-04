// import https from 'https'
import axios from 'axios'
import { getValue, TOKEN_DICTIONARY } from './save.service.js'
import * as dotenv from 'dotenv'
dotenv.config()

export const getIcon = (icon) => {
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
            return '🌥'
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
            return ''
        
    }
}

export const getWeather = async (city) => {
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

    return data 
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