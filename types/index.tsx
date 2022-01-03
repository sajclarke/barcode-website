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
  skills?: { label: string; value: string }[]
}

export interface IProfile {
  uid: string
  email: string
  name: string
  provider: string
  photoUrl: string
  bio?: string
  skills?: { label: string; value: string }[]
}

export interface IPost {
  id: string
  title: string
  description: string
  createdAt: string
  author?: IUser
}
