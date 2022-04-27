const fs = require('fs')
const path = require('path')
const { v4 : uuidv4 } = require('uuid')

const guardarFile = (
  files,
  modelo,
  formatosPermitidos = ['jpg', 'png', 'jpeg', 'gif'],
  nameImagenAnterior = false
) => {
  return new Promise((res, rej) => {
    const { imagen } = files

    let formato = imagen.name.split('.')
    formato = formato[formato.length - 1]

    if(!formatosPermitidos.includes(formato)) {
      return rej(`El formato ${formato} no es valido - Permitidos: ${formatosPermitidos}`)
    }
    const nombre = uuidv4()
    const uploadPath = path.join(__dirname, '../uploads', modelo, `${nombre}.${formato}`)

    imagen.mv(uploadPath, (err) => {
      if (err) rej(err)
      if(nameImagenAnterior) fs.unlinkSync(path.join(__dirname, '../uploads', modelo, nameImagenAnterior))
      res({
        nombre_imagen:`${nombre}.${formato}`
      })
    })
  })
}

module.exports = {
    guardarFile,
}