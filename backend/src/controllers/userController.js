import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from  'crypto';
import moment from 'moment';

import users from "../models/User.js";
import blocklist from './../../redis/blocklistController.js';

function createTokenJWT(user) {
  const payload = {
    id: user._id,
    name: user.name ?? 'Teste'
  }

  const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '15m'});

  return token;
}

function createTokenOpaque(user) {
  const tokenOpaque = crypto.randomBytes(24).toString('hex');
  const dateExp = moment().add(5, 'd').unix();
  return tokenOpaque;
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

    try {
      await user.save();
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
      const accessToken = createTokenJWT(req.user);
      const refreshToken = createTokenOpaque(req.user);
      
      res.set('Authorization', accessToken);
  
      return res.status(200).json({refreshToken});

    } catch(error) {
      return res.status(500).json({error: error.message});
    }
  }

  static async logout(req, res) {
    try {
      const token = req.token;
      await blocklist.addToken(token);
      return res.status(204).send();

    } catch(error) {
      return res.status(500).json({error: error.message});
    }
  }
}

export default UserController;