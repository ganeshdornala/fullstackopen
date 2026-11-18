const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return fetch(`${baseUrl}/all`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch countries')
            }
            return response.json()
        })
}

export default {getAll};