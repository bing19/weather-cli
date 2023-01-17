import chalk from 'chalk'
import dedent from 'dedent-js'
import { Weather } from '../interface/weather.interface.js'


export const printError = (error: Error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error.message)
}

export const printSuccess = (message: String) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

export const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] Ввод города
        -t [API_KEY] Сохранение токена
        `)
    )
}

export const printWeather = (weather: Weather , icon: any) => {
    console.log(
        dedent(`${chalk.bgBlue(` Погода в ${weather.name}е `)}
        ${icon}  ${weather.description}
        🌡 Температура: ${weather.temp}, ощущается как ${weather.feel}
        Влажность: ${weather.humidity}
        Скорость ветра: ${weather.windSpeed}
        Облачность: ${weather.clouds}
        `)
    )
}