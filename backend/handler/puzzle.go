package handler

import (
	"blackmarket_puzzles/database"
	"blackmarket_puzzles/model"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

// GetPuzzle get a puzzle
func GetPuzzle(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var user model.User
	db.Find(&user, id)
	if user.Username == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No user found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Product found", "data": user})
}

// CreateUser new puzzle
func CreatePuzzle(c *fiber.Ctx) error {
	// type NewPuzzle struct {
	// 	Name 						string 										`json:"name"`
	// 	Description   	string 										`json:"description"`
	// 	Count    			 	int 	 									`json:"count"`
	// 	PuzzleCondition model.PuzzleCondition		`json:"puzzleCondition"`
	// 	MissingPieces 	bool										`json:"missingPieces"`
	// 	Id 							uint 
	// }

	db := database.DB
	puzzle := new(model.Puzzle)
	if err := c.BodyParser(puzzle); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})

	}
	fmt.Printf("puzzle: %+v\n", puzzle)
	if err := db.Create(&puzzle).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't save puzzle", "data": err})
	}


	return c.JSON(fiber.Map{"status": "success", "message": "Created user", "data": puzzle})
}

// UpdatePuzzle update puzzle
func UpdatePuzzle(c *fiber.Ctx) error {
	type UpdateUserInput struct {
		Names string `json:"names"`
	}
	var uui UpdateUserInput
	if err := c.BodyParser(&uui); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}
	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Invalid token id", "data": nil})
	}

	db := database.DB
	var user model.User

	db.First(&user, id)
	user.Names = uui.Names
	db.Save(&user)

	return c.JSON(fiber.Map{"status": "success", "message": "User successfully updated", "data": user})
}

// DeletePuzzle delete puzzle
func DeletePuzzle(c *fiber.Ctx) error {
	type PasswordInput struct {
		Password string `json:"password"`
	}
	var pi PasswordInput
	if err := c.BodyParser(&pi); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}
	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Invalid token id", "data": nil})

	}

	if !validUser(id, pi.Password) {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Not valid user", "data": nil})

	}

	db := database.DB
	var user model.User

	db.First(&user, id)

	db.Delete(&user)
	return c.JSON(fiber.Map{"status": "success", "message": "User successfully deleted", "data": nil})
}