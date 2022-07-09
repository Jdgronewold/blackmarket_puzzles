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
	var friendship model.Friendship
	err := db.Where("user_one_id = ? AND user_two_id = ?", smaller_id, larger_id).Find(&friendship).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No friendship found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Product found", "data": friendship})
}

func CreateFriendship(c *fiber.Ctx) error {

	db := database.DB
	friendship := new(model.Friendship)
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
	db := database.DB
	var friendships []model.Friendship

	err := db.Where("user_one_id = ? OR user_two_id = ?", user_one_id, user_one_id).Find(&friendships).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		friends := []model.Friendship{}
		return c.JSON(fiber.Map{"status": "success", "message": "Created friendship", "data": friends})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Created friendship", "data": friendships})

}