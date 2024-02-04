import express from 'express'
import ProductManager from './ProductManager.js'

// Dejé la DB cargada con 10 productos de antemano utilizando la función .addProducts(product)

let gestor_productos = new ProductManager ('./SRC/DataBase/db.json')

const my_app = express ()
const PORT = 8080

// Defino las acciones que tomará mi servidor ante las diferentes rutas

my_app.get('/products', async (req, res) => {
    const {limit} = req.query // Si no se mandó, tendrá el valor 'undefined'
    console.log("Enviando productos al cliente...")

    let my_products = await gestor_productos.getProducts()

    if (my_products === -1) // Caso de que la DB esté vacía
        res.send("Sin productos por ahora!")
    
    else 
    
    {
        // En el caso de que la DB no esté vacía, devuelvo la cantidad solicitada
        // O todos los productos en caso que no esté definido el query param limit
        let cantidad_productos
        !limit? cantidad_productos = my_products.length: cantidad_productos = limit

        // Caso de que envíen un límite, pero no sea un número
        isNaN(cantidad_productos)? res.send("El límite debe ser numérico!") : res.send(my_products.splice(0, cantidad_productos))
    }

    console.log("Productos enviados!")
} )

my_app.get('/products/:pid', async (req, res) => {

    console.log("Enviando producto específico...")

    let product_code = req.params.pid // Obtengo el código del producto

    // Intento obtenerlo de la DB
    let my_product = await gestor_productos.getProductById(product_code)

    // Si no existe, doy el aviso. Caso contrario, lo envío
    my_product == -1 ? res.send("El producto no existe!") : res.send(my_product)

    console.log("Producto enviado!")
})

// Levanto mi servidor y quedo escuchando solicitudes en el puerto en cuestión.

my_app.listen(PORT, () => {
    console.log(`Escuchando solicitudes en el puerto ${PORT}`)
})