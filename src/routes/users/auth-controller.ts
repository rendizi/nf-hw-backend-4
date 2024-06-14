import { Request, Response } from 'express'
import { CreateUserDto, UpdateUserDto } from './dtos/CreateUser.dto'
import AuthService from './auth-service'
import S3Service from '../../cloud_storage/s3'

class AuthController {
  private authService: AuthService
  private s3: S3Service

  constructor(authService: AuthService) {
    this.authService = authService
    this.s3 = S3Service.getInstance()
  }

  registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createUserDto: CreateUserDto = req.body
      const user = await this.authService.registerUser(createUserDto)
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json({ message: 'Error registering user' })
    }
  }

  loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body
      const result = await this.authService.loginUser(username, password)
      if (!result) {
        res.status(401).json({ message: 'Invalid email or password' })
        return
      }
      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({ message: 'Error logging in' })
    }
  }

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body
      const result = await this.authService.refreshToken(token)
      if (!result) {
        res.status(401).json({ message: 'Invalid or expired refresh token' })
        return
      }
      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({ message: 'Error refreshing token' })
    }
  }

  getProfile = async (req: Request, res: Response):Promise<void> => {
    try{
      const username = req.params.username 
      const result = await this.authService.getProfile(username)
      if (result){
        res.status(200).send(result)
        return 
      }else{
        res.status(400).send({message: "not found"})
      }
    }
    catch (err){
      res.status(400).send({err: err})
    }
  }

  updateProfile = async(req: Request, res: Response):Promise<void> => {
    try{
      const username = (req as any).username
      if (!username){
        res.status(400).send({"message":"username is not provided"})
        return 
      }
      const updateFields: UpdateUserDto = {}
      const formData = req.body
      if (formData.bio){
        updateFields.bio = formData.bio as string 
      }
      if (formData.profileImage){
        const file = (req as any).file 
        if (file){
          const filePath = file.path; 
          const key = `profileImages/${username}`;
          await this.s3.uploadFile(filePath, key); 
          updateFields.profileImage = key;
        }
      }

      const resp = await this.authService.updateUser(username, updateFields)
      if (resp){
        res.status(200).send({message:'Profile updated successfully'});
      }
      else{
        res.status(400).send({message:'Profile updated successfully'});
      }
    }catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).send('Failed to update profile');
    }
  }

  //set favorite
  like = async(req: Request, res: Response):Promise<void> => {
    try{
      const userId = (req as any)._id 
      if (!userId){
        res.status(400).send({"message":"userId is not provided"})
        return 
      }
      const songId = req.params.id
      const fav = await this.authService.like(userId, songId)
      res.status(200).send(fav)
    }
    catch (err){
      res.status(500).send('Failed to like song');
    }
  }

  //remove favorite 
  unlike = async(req: Request, res: Response):Promise<void> => {
    try{
      const userId = (req as any)._id 
      if (!userId){
        res.status(400).send({"message":"userId is not provided"})
        return 
      }
      const songId = req.params.id as string 
      const fav = await this.authService.unlike(userId, songId)
      res.status(200).send(fav)
    }
    catch (err){
      res.status(500).send('Failed to like song');
    }
  }
 }

export default AuthController
