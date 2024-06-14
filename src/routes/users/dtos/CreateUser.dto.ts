export interface CreateUserDto {
  username: string
  password: string
}

export interface UpdateUserDto {
  bio?: string 
  profileImage?: string 
}