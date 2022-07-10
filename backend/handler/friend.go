package handler

import (
	"blackmarket_puzzles/database"
	"blackmarket_puzzles/model"
	"errors"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func unique(intSlice []int) []int {
	keys := make(map[int]bool)
	list := []int{}	
	for _, entry := range intSlice {
			if _, value := keys[entry]; !value {
					keys[entry] = true
					list = append(list, entry)
			}
	}    
	return list
}

// GetPuzzle get a puzzle
func GetFriendship(c *fiber.Ctx) error {
	user_one_id := c.Params("user_one_id")
	user_two_id := c.Params("user_two_id")
	var smaller_id int
	var larger_id int

	if user_one_id < user_two_id {
		si, _ := strconv.Atoi(user_one_id)
		smaller_id = si
		li, _ := strconv.Atoi(user_two_id)
		larger_id = li
	} else {
		si, _ := strconv.Atoi(user_two_id)
		smaller_id = si
		li, _ := strconv.Atoi(user_one_id)
		larger_id = li
	}

	db := database.DB
	var friendship model.Friend
	err := db.Where("user_one_id = ? AND user_two_id = ?", smaller_id, larger_id).Find(&friendship).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No friendship found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Product found", "data": friendship})
}

func CreateFriendship(c *fiber.Ctx) error {

	db := database.DB
	friendship := new(model.Friend)
	if err := c.BodyParser(friendship); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Friendship not made", "data": err})

	}
	fmt.Printf("puzzle: %+v\n", friendship)
	if err := db.Create(&friendship).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Friendship not made", "data": err})
	}


	return c.JSON(fiber.Map{"status": "success", "message": "Created friendship", "data": friendship})
}

func GetFriendsForUser(c *fiber.Ctx) error {
	user_one_id := c.Params("user_id")
	parsed_id, _ := strconv.Atoi(user_one_id)
	db := database.DB
	var friendships []model.Friend

	err := db.Where("user_one_id = ? OR user_two_id = ?", user_one_id, user_one_id).Find(&friendships).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		friends := []model.Friend{}
		return c.JSON(fiber.Map{"status": "success", "message": "Created friendship", "data": friends})
	}

	var user_ids []int

	for _, friend := range friendships {
		var friend_id int
		if friend.UserOneID == parsed_id {
			friend_id = friend.UserTwoID
		} else {
			friend_id = friend.UserOneID
		}
		user_ids = append(user_ids, int(friend_id))
	}

	user_ids = unique(user_ids)

	var users []model.User
	user_err := db.Where("id IN ? OR id IN ?", user_ids, user_ids).Find(&users).Error
	if errors.Is(user_err, gorm.ErrRecordNotFound) {
		return c.JSON(fiber.Map{"status": "error", "message": "Friendship not found", "data": user_err})
	}
	
	type ReturnedFriend struct {
		ID uint
		Username string `json:"username"`
	}

	type FullFriend struct {
		Friendship model.Friend `json:"friendship"`
		FriendUser ReturnedFriend `json:"friendUser"`
	}

	var returnedFriends []FullFriend
	for _, friend := range friendships {
		var friend_id int
		if friend.UserOneID == parsed_id {
			friend_id = friend.UserTwoID
		} else {
			friend_id = friend.UserOneID
		}

		var selectedFriend model.User
		for _, user := range users {
			if (user.ID == uint(friend_id)) {
				selectedFriend = user 
			}
		}

		returnedFriend := FullFriend{
			Friendship: friend,
			FriendUser: ReturnedFriend{
				ID: selectedFriend.ID,
				Username: selectedFriend.Username,
			},
		}
		returnedFriends = append(returnedFriends, returnedFriend)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Created friendship", "data": returnedFriends})

}