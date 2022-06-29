import users from "../models/User.js";

class UserController {
  
  static async getUser(req, res) {
    const {idUser} = req.params;

    try {
      const user = await users.findById(idUser)
      return res.status(200).json(user);

    } catch(error) {
      return res.status(500)
        .json({message: `${error.message} - Erro ao buscar Id do Usuário!`})
    }
  }

  static async createUser(req, res) {
    const user = new users(req.body);

    try {
      await user.save();
      return res.status(200).json(user);

    } catch(error) {
      return res.status(500)
        .json({message: `${error.message} - Erro ao buscar Id do Usuário!`})
    }
  }
}

export default UserController;