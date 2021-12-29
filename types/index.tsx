// export default interface IUser {
//   id: string
//   name: string
//   image: string
//   email: string
//   emailVerified: null | Boolean
//   createdAt: Date
//   updatedAt: Date
//   //   posts?: IPost[]
// }

export interface IUser {
  uid: string
  email: string
  name: string
  provider: string
  photoUrl: string
  token: string
}

export interface IPost {
  id: string
  title: string
  description: string
  createdAt: string
  author?: IUser
}
