import { IUser } from "./user"

export interface IMemoryCreate {
  title: string
  content: string
  picture_date: string
  main_picture: string
  additionnal_pictures: string[] | []
  location : ILocationCreate
  place : IPlaceCreate
}

export interface IMemory extends IMemoryCreate {
    id: number
    user : IUser
  }
  
export interface ILocationCreate {
  area : string
  department: string
  district: string
  street : string
  city : string
  zipcode : number
  latitude : string
  longitude : string
}

export interface ILocation extends ILocationCreate {
  id: number
}
export interface IPlaceCreate {
  name : string
  type : string
}

export interface IPlace extends IPlaceCreate {
  id : number
}

