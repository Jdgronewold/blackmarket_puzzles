package router

import (
	"blackmarket_puzzles/handler"
	"blackmarket_puzzles/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// SetupRoutes setup router api
func SetupRoutes(app *fiber.App) {
	// Middleware
	app.Get("/health", handler.Health)
	api := app.Group("/api", logger.New())

	// Auth
	auth := api.Group("/auth")
	auth.Post("/login", handler.Login)

	// User
	user := api.Group("/user")
	user.Get("/:id", handler.GetUser)
	user.Post("/", handler.CreateUser)
	user.Patch("/:id", middleware.Protected(), handler.UpdateUser)
	user.Delete("/:id", middleware.Protected(), handler.DeleteUser)

	// Puzzle
	puzzle := api.Group("/puzzle")
	puzzle.Get("/:id", middleware.Protected(), handler.GetPuzzle)
	puzzle.Post("/", middleware.Protected(), handler.CreatePuzzle)

	// Friendship
	friendship := api.Group("/friend")
	friendship.Get("/:user_id", middleware.Protected(), handler.GetFriendsForUser)
	friendship.Get("/:user_one_id/:user_two_id", middleware.Protected(), handler.GetFriendship)
	friendship.Post("/", middleware.Protected(), handler.CreateFriendship)
}