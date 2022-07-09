package handler

import (
	"blackmarket_puzzles/database"
	"blackmarket_puzzles/model"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

// GetPuzzle get a puzzle
func GetPuzzle(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var puzzle model.Puzzle
	db.Find(&puzzle, id)
	if puzzle.Name == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No puzzle found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Product found", "data": puzzle})
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