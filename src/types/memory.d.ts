export interface IMemoryToCreate {
  memory : IMemory
  location : ILocation 
  place : IPlace
}

export interface IMemory {
  title: string
  content: string
  picture_date: string
  main_picture: string
  additionnal_pictures: string[] | []
}

export interface ILocation {
  area : string
  department: string
  district: string
  street : string
  city : string
  zipcode : number | null
  latitude : string
  longitude : string
}

export interface IPlace {
  name : string
  type : string
}

