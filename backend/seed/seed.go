package seed

import (
	"blackmarket_puzzles/model"
	"fmt"

	"gorm.io/gorm"
)

var User_Seed = []model.User {
	{
		Username: "Jeff Gronewold",
		Email: "jeff.gronewold@test.com",
		Password: "$2a$14$6G20cGGwps1g/TdajnH0sOGs60oGm7UGizDsq6kVVdBo/GE2EZTSe",
		Puzzles: []*model.Puzzle{
			{
				Name: "T-rex puzzle",
				Description:    	"It's a t-rex! Why are its arms so short?",
				Count:    			 	1000,
				PuzzleCondition: model.Fair, // "Fair"		
				MissingPieces: 	false,												
			},
			{
				Name: "Aspen Puzzle",
				Description:    	"Ever been to aspen and done the four pass loop? This is pretty much the same thing",
				Count:    			 	1200,
				PuzzleCondition: model.Good, //		
				MissingPieces: 	false,							
			},
		},
	},
	{
		Username: "Kara Aschraft",
		Email: "kara.ashcraft@test.com",
		Password: "$2a$14$g8pgjJjnShFpSHwlFHQKQO420DnkxWNPdrybzqR8Izhhlrdhsjl9W",
		Puzzles: []*model.Puzzle{
			{
				Name: "Bird puzzle",
				Description:    	"There's like 300 birds in this thing",
				Count:    			 	2000,
				PuzzleCondition: model.New, // "Fair"		
				MissingPieces: 	false,							
			},
	
			{
				Name: "Colorado puzzle",
				Description:    	"So cool, so fetch",
				Count:    			 	1000,
				PuzzleCondition: model.Poor, // "Fair"		
				MissingPieces: 	true,							
			},
		},
	},
	{
		Username: "Lizzie Thompson",
		Email: "lizze@test.com",
		Password: "$2a$14$6.eXyhun3Al1vqpuGFWhAe6sWw/Bpt4ZoZriOPumFeGQD6kvRCG0q",
	},
	{
		Username: "Erin Hattler",
		Email: "erin@test.com",
		Password: "$2a$14$oogW2H1ciSSHAwVmVlxYFu3ddlfMX08y8aL1bszNKgI6NRcDqjPKS",
	},
}

var Friend_Order = map[int][]int{
	0: {2,3}, // order in the array -> {actual user ID}
	1: {3,4},
}

func SeedData(db *gorm.DB) {
	user_ids := []uint{}

	for i := range User_Seed {
		err := db.Debug().Model(&model.User{}).Create(&User_Seed[i]).Error
		if err != nil {
			fmt.Printf(" Error %s", err.Error())
		}
		user_ids = append(user_ids, User_Seed[i].ID)
	}

	// now make the friends
	for key, element := range Friend_Order {
		user_one_id := user_ids[key]
		for _, el := range element {
			user_two_id := el
			friendship := model.Friend{
				UserOneID: int(user_one_id),
				UserTwoID: user_two_id,
				Pending_First_Second: true,
				Pending_Second_First: false,
				Friends: false,
			}
			err := db.Debug().Model(&model.Friend{}).Create(&friendship).Error
			if err != nil {
				fmt.Printf(" Error %s", err.Error())
			}
		}
	}

}
