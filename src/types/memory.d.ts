import { IUser } from "./user"

// Typage de ce qu'on envoie à l'API
export interface IDataToCreate {
  memory : IMemoryToCreate
  location : ILocationToCreate
  place : IPlaceToCreate
}

// Typage de la partie "memory" de ce qu'on envoie à l'API
export interface IMemoryToCreate {
  title: string
  content: string
  picture_date: string
  main_picture: string
  additionnal_pictures: string[] | undefined
}

// Typage de la partie "location" de ce qu'on envoie à l'API
export interface ILocationToCreate {
  area : string
  department: string
  district: string
  street : string
  city : string
  zipcode : number | undefined
  latitude : string
  longitude : string
}

// Typage de la partie "place" de ce qu'on envoie à l'API
export interface IPlaceToCreate {
  name : string
  type : string
}

// Typage de ce qu'on reçoit de l'API
export interface IDataCreated extends IMemoryCreated {
  location : ILocationCreated
  place : IPlaceCreated
  user : IUser
  picture : IPictureCreated[] | []
}

export interface IMemoryCreated extends IMemoryToCreate {
  id: number
}

export interface ILocationCreated extends ILocationToCreate {
  id : number
}

export interface IPlaceCreated extends IPlaceToCreate { 
  id : number
}

export interface IPictureCreated {
  id : number
  picture : string
}

