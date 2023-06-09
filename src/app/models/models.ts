export interface User{
  userName: string
}

export interface Memo{
  id: number,
  user: User,
  message: string
}

export interface DisplayedMemo extends Memo{
  isDifferent: boolean,
  isNew: boolean
}
