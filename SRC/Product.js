import crypto from 'crypto'

class Product {

    constructor (title, description, price, thumbnail, stock, code)

    {
        // Antes que nada valido que me hayan enviado todos los campos
        if (!title || !description || !price || !thumbnail || !stock ||!code)

        {
            console.error("Error al declarar producto!")
            return
        }

        else

        {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.id = crypto.randomBytes(15).toString('hex') // Genero un ID random de 15 Bytes
            this.stock = stock
            this.code = code
            console.log("Producto generado correctamente!")
        }
    }    
}

export default Product