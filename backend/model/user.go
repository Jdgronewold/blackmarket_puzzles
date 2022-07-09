package model

import "gorm.io/gorm"

// User struct
type User struct {
	gorm.Model
	Username string 							`gorm:"unique_index;not null" json:"username"`
	Email    string 							`gorm:"unique_index;not null" json:"email"`
	Password string 							`gorm:"not null" json:"password"`
	Puzzles  []*Puzzle 						`gorm:"foreignKey:Owner_id"`
	Friends  []*Friend 						`gorm:"many2many:user_friends"` //foreignKey:User_One_ID,User_Two_ID; references:User_One_ID,User_Two_ID"`
}