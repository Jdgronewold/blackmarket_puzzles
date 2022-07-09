package model

import (
	"time"

	"gorm.io/gorm"
)

// Friend struct
// type Friendship struct {
// 	CreatedAt 							time.Time
// 	UpdatedAt 							time.Time
// 	User_One_ID 						uint 				`gorm:"primarykey;not null" json:"user_one_id"`
// 	User_One 								User 				`gorm:"foreignKey:User_One_ID"`
// 	User_Two_ID 						uint 				`gorm:"primarykey;not null check:user_one_id < user_two_id" json:"user_two_id"`
// 	User_Two 								User  			`gorm:"foreignKey:User_One_ID"`
// 	Pending_First_Second		bool
// 	Pending_Second_First		bool
// 	Friends									bool
// }

type Friend struct {
	UserOneID  				int `gorm:"primaryKey"`
	UserTwoID 				int `gorm:"primaryKey"`
	CreatedAt 				time.Time
	DeletedAt 				gorm.DeletedAt
	Pending_First_Second		bool
	Pending_Second_First		bool
	Friends									bool
}
