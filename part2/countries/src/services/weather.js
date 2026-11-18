const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY

    const request = fetch(
        `${baseUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )

    return request.then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }

        return response.json()
    })
}

export default { getWeather }
