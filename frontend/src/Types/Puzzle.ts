import { User } from "./User"

export enum PuzzleCondition {
  "Poor" = "Poor",
  "Fair" = "Fair",
  "Good" = "Good",
  "New" = "New",
}

export interface IPuzzle {
  ID:               number
  name: 					 	string 						
  description:    	string 						
  count:    			 	number 	 						
  puzzleCondition:  PuzzleCondition		
  missingPieces: 	  boolean							
  Owner: 				  	User 						
  owner_id:					number
}