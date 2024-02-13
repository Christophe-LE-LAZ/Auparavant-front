export interface IMemory {
    id: number
    title: string
    content: string
    picture_date: string
    main_picture: string
    location : ILocation
    user : IUser
    place : IPlace
  }
  
export interface ILocation {
  id: number
  area : string
  department: string
  district: string
  street : string
  city : string
  zipcode : number
  latitude : string
  longitude : string
}

export interface IUser {
  id : number
  firstname : string
  lastname : string
  email : string
  roles : string[]
}

export interface IPlace {
  id : number
  name : string
  type : string
}

