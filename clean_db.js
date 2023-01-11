require("dotenv").config()
const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL)

console.log(
    `Exécution du job de clean de db`
)
try {
    sequelize.query(
        `DELETE FROM todos WHERE statut= 'EN_RETARD'`
    )
} catch (error) {
    console.error(error)
}

