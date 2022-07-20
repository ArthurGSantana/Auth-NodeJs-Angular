import bcrypt from 'bcrypt';

import users from "../models/User.js";
import tokens from './../auth/tokens.js';
import CheckEmail from './../middlewares/email.js';

function createAddress(route, id) {
  const baseURL = process.env.BASE_URL;
  return `${baseURL}${route}${id}`;
}

class UserController {

  constructor () {
    this.createUser = this.createUser.bind(this);
  }

  static async getUser(req, res) {
    const {idUser} = req.params;

    try {
      const user = await users.findById(idUser);
      return res.status(200).json(user);

    } catch(error) {
      return res.status(500)
        .json({message: `${error.message} - Erro ao buscar Id do Usuário!`});
    }
  }

  static async getUserStrategy(idUser) {
    try {
      const user = await users.findById(idUser);
      return user;

    } catch(error) {
      return {message: `${error.message} - Erro ao buscar Id do Usuário!`};
    }
  }

  static async getUserByEmail(req, res) {
    const {email} = req.query;

    try {
      const user = await users.find({'email': email});
      return res.status(200).json(user);

    } catch(error) {
      return res.status(500)
        .json({message: `${error.message} - Erro ao buscar Email do Usuário!`})
    }
  }

  static async getUserByEmailStrategy(email) {
    try {
      const user = await users.findOne({'email': email});
      return user;

    } catch(error) {
      return {message: `${error.message} - Erro ao buscar Email do Usuário!`};
    }
  }

  static async listUsers(req, res) {
    try {
      const userList = await users.find();
      return res.status(200).json(userList);

    } catch(error) {
      return res.status(500)
        .json({message: `${error.message} - Erro ao buscar lista de usuários!`})
    }
  }

  static async createUser(req, res) {
    const user = new users(req.body);

    user.password = await bcrypt.hash(user.password, 12);
    user.verifiedEmail = false;

    try {
      await user.save();

      const address = createAddress('/user/check_email/', user._id);
      const checkEmail = new CheckEmail(user, address);
      checkEmail.sendEmail().catch(console.log)

      return res.status(201).json(user);

    } catch(error) {
      return res.status(500)
        .json({message: `${error.message} - Erro ao buscar Id do Usuário!`})
    }
  }

  static async deleteUser(req, res) {
    const {idUser} = req.params;

    try {
      await users.findByIdAndDelete(idUser);
      return res.status(200).send({message: 'Usuário deletado com sucesso!'});

    } catch(error) {
      return res.status(500)
        .json({message: `${error.message} - Erro ao deletar usuário!`})
    }
  }

  static async login(req, res) {
    try {
      console.log(req.user)
      const accessToken = tokens.access.create(req.user);
      const refreshToken = await tokens.refresh.create(req.user._id);
      
      res.set('Authorization', accessToken);
  
      return res.status(200).json({refreshToken});

    } catch(error) {
      return res.status(500).json({error: error.message});
    }
  }

  static async logout(req, res) {
    try {
      const token = req.token;
      await tokens.access.invalid(token);
      return res.status(204).send();

    } catch(error) {
      return res.status(500).json({error: error.message});
    }
  }

  static async verifiedEmail(req, res) {
    const {idUser} = req.params;
    const user = {verifiedEmail: true};

    try {
      await users.findByIdAndUpdate(idUser, {$set: user});
      return res.status(200).send();

    } catch(error) {
      return res.status(500).json({error: error.message});
    }
  }
}

export default UserController;