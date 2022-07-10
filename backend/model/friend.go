package model

import (
	"time"

	"gorm.io/gorm"
)

type Friend struct {
	UserOneID  				int `gorm:"primaryKey"`
	UserTwoID 				int `gorm:"primaryKey"`
	CreatedAt 				time.Time
	DeletedAt 				gorm.DeletedAt
	Pending_First_Second		bool
	Pending_Second_First		bool
	Friends									bool
}
