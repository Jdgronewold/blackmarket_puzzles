import { User } from "./User"

export interface IFriend {
  UserOneID: number,  				
  UserTwoID: number								
  Pending_First_Second: boolean		
  Pending_Second_First: boolean		
  Friends: boolean							
}

export interface IFriendWithUser {
  friendship: IFriend,
  friendUser: Partial<User>
}