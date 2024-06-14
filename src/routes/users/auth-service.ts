import { CreateUserDto, UpdateUserDto } from './dtos/CreateUser.dto'
import { IUser } from './models/User'
import UserModel from './models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import RefreshTokenModel from './models/RefreshToken'
import {User} from './types/response'
import { IFavorites } from './models/Favorites'
import FavoriteModel from './models/Favorites'

dotenv.config()

class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET!
  private readonly jwtRefreshSecret = process.env.JWT_REFRESH_SECRET!

  async registerUser(createUserDto: CreateUserDto): Promise<IUser> {
    const { password, username } = createUserDto
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      username,
      password: hashedPassword
    })

    await newUser.save()
    return newUser
  }

  async loginUser(
    username: string,
    password: string
  ): Promise<{
    user: IUser
    accessToken: string
    refreshToken: string
  } | null> {
    const user = await UserModel.findOne({ username })
    if (!user) return null

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return null

    const accessToken = this.generateJwt(user)
    const refreshToken = this.generateRefreshToken(user)

    const refreshTokenDoc = new RefreshTokenModel({
      token: refreshToken,
      user: user._id
    })
    await refreshTokenDoc.save()

    return { user, accessToken, refreshToken }
  }

  private generateJwt(user: IUser): string {
    return jwt.sign({ id: user._id, username: user.username }, this.jwtSecret, {
      expiresIn: '1h'
    })
  }

  private generateRefreshToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, username: user.username },
      this.jwtRefreshSecret,
      { expiresIn: '7d' }
    )
  }

  verifyJwt(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret)
    } catch (err) {
      return null
    }
  }

  verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtRefreshSecret)
    } catch (err) {
      return null
    }
  }

  async refreshToken(
    oldToken: string
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const payload = this.verifyRefreshToken(oldToken)
    if (!payload) return null

    const user = await UserModel.findById(payload.id)
    if (!user) return null

    const newAccessToken = this.generateJwt(user)
    const newRefreshToken = this.generateRefreshToken(user)

    const refreshTokenDoc = new RefreshTokenModel({
      token: newRefreshToken,
      user: user._id
    })
    await refreshTokenDoc.save()

    await RefreshTokenModel.deleteOne({ token: oldToken })

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  async getProfile(username: string): Promise<User | null> {
    try {
      const resp = await UserModel.findOne({ username }).exec();
      return resp ? resp.toObject() : null; 
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null; 
    }
  }

  async updateUser(username: string, updateFields: UpdateUserDto): Promise<boolean> {
    try {
      const updateResult = await UserModel.updateOne({ username }, { ...updateFields }).exec();
      if (updateResult.modifiedCount === 1){
      return true }
      else{
        return false
      }
    } catch (err) {
      console.error('Error updating user profile:', err);
      return false;
    }
  }

  async like(userId: string, songId: string):Promise<IFavorites>{
    const newFav = new FavoriteModel({
      userId,
      songId
    })

    await newFav.save()
    return newFav
  }

  async unlike(userId: string, songId: string): Promise<IFavorites | null> {
    const removedFav = await FavoriteModel.findOneAndDelete({
        userId,
        songId
    });

    return removedFav;
}

}

export default AuthService
