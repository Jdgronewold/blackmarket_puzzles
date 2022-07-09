package model

import "gorm.io/gorm"

// Puzzle struct
type Puzzle struct {
	gorm.Model
	Name 					 	string 						`gorm:"unique_index;not null" json:"name"`
	Description    	string 						`json:"description"`
	Count    			 	int 	 						`json:"count"`
	PuzzleCondition PuzzleCondition		`json:"puzzleCondition"`
	MissingPieces 	bool							`json:"missingPieces"`
	Owner 					*User 						`gorm:"foreignKey:Owner_id"`
	Owner_id				uint 							`json:"owner_id"`
}

type PuzzleCondition int64

const (
	Poor PuzzleCondition = iota
	Fair        
	Good        
	New        
)

func (s PuzzleCondition) String() string {
	switch s {
	case Poor:
		return "Poor"
	case Fair:
		return "Fair"
	case Good:
		return "Good"
	case New:
		return "New"
	}
	return "unknown"
}