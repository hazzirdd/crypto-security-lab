const bcrypt = require('bcryptjs');
const users = []

module.exports = {
    login: (req, res) => {
      console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          const authenticated = bcrypt.compareSync(password, users[i].passwordHash)
          if (authenticated === true){
          let userReturn = {...user[i]}
          delete userReturn.passwordHash
          res.status(200).send(userReturn)
        } 
       }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)

      let user = {
        username,
        email,
        firstName,
        lastName,
        passwordHash
      }
        users.push(user)
        let userReturn = {...user}
        delete userReturn.passwordHash
        console.log(userReturn)
        res.status(200).send(req.body)
    }
}