export interface User{
  userName: string
}

export interface Memo{
  id: number,
  user: User,            //any bcs of the json object we got from the API
  message: string
}
