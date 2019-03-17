const {GIPHY_API_KEY} = require('./secrets')
const axios = require('axios')

const giphyAPI = axios.create({
  baseURL: 'https://api.giphy.com/v1',
  params: {
    'api_key': GIPHY_API_KEY
  }
})

module.exports = {
  getGiphyURL (keyword) {

    return new Promise((res, rej) => {
  
      giphyAPI.get('/gifs/search', {
        params: {
          'q': keyword
        }
      })
        .then(response => {
          res(response.data.data[0].images.original.url)
        })
        .catch(error => {
          rej(error)
        })
    })
  }
}

