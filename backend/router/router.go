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

	// User
	puzzle := api.Group("/puzzle")
	puzzle.Get("/:id", middleware.Protected(), handler.GetPuzzle)
	puzzle.Post("/", middleware.Protected(), handler.CreatePuzzle)
	puzzle.Patch("/:id", middleware.Protected(), handler.UpdatePuzzle)
	puzzle.Delete("/:id", middleware.Protected(), handler.DeletePuzzle)
}