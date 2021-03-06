const createDir = require('./utils/createDir')
const path = require('path')
const mirror = require('mirror-folder')
const fs = require('fs')
const Dat = require('dat-node')

// Download an archive, calling cb when it is completed
// This will close the dat connection when the dl is complete

module.exports = function download (key, dest, cb) {
  createDir(dest)
  Dat(dest, {key}, function (err, dat) {
    if (err) throw err
    dat.archive.on('sync', (err) => {
      dat.close()
      cb(dat)
    })
    const network = dat.joinNetwork()
  })
}


