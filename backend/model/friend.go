package model

import (
	"time"
)

// Friend struct
type Friendship struct {
	CreatedAt 							time.Time
	UpdatedAt 							time.Time
	User_One_ID 						uint 				`gorm:"primarykey;not null" json:"user_one_id"`
	User_Two_ID 						uint 				`gorm:"primarykey;not null check:user_one_id < user_two_id" json:"user_two_id"`
	Pending_First_Second		bool
	Pending_Second_First		bool
	Friends									bool
}