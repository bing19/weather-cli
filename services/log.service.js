import chalk from 'chalk'
import dedent from 'dedent-js'


export const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

export const printSuccess = (message) => {
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

export const printWeather = (weather, icon) => {
    console.log(
        dedent(`${chalk.bgGray(' Погода ')}
        ${icon}  ${weather.weather[0].description}
        Температура: ${weather.main.temp}, ощущается как ${weather.main.feels_like}
        Влажность: ${weather.main.humidity}
        Скорость ветра: ${weather.wind.speed}
        Облачность: ${weather.clouds.all}
        `)
    )
}