'use strict'

const client = require('cheerio-httpcli')

exports.quote = (req, res) => {
  try {
    if (!req.query.symbol) {
      throw 'symbol is required'
    }

    client.fetch(`https://www.bloomberg.co.jp/quote/${req.query.symbol}`, function (err, $, response, body) {
      const price = $('.basic-quote .price').text()
      const currency = $('.basic-quote .currency').text()
      const updatedAt = $('.basic-quote .price-datetime').text().replace('更新日時', '').slice('2', '-1')

      if (!price && !currency) {
        throw 'not found'
      }

      res.send({
        price: price,
        currency: currency,
        updated_at: updatedAt
      })
    })
  } catch (e) {
    res.status(500).send({
      error: {
        message: e.message
      }
    })
  }
}
