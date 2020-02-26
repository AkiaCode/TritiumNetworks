const path = require('path').resolve()
const { render, renderFile } = require('ejs')
const { existsSync, readFileSync } = require('fs')
const factMaker = require('./maker')

function layout (point, options) {
  point = [path, 'layouts', point].join('/')
  if (existsSync(point)) return render(readFileSync(point, 'utf-8'), options)
  else return 'layout "' + point + '" is not exist'
}

function func (req, res, point, data) {
  const facts = factMaker()

  let options = { req, layout, facts }
  if (typeof data === 'object') options = { req, ...data, layout }
  options = { ...options, options }

  renderFile([path, 'page', point].join('/'), options, (err, str) => {
    if (err) console.log(err)
    res.send(str)
  })
}

module.exports = func
