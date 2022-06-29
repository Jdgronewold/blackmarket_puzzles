package main

import (
	"blackmarket_puzzles/router"
	"fmt"
	"log"

	"blackmarket_puzzles/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	database.ConnectDB()

	router.SetupRoutes(app)
	fmt.Print("App running on 3001")
	log.Fatal(app.Listen(":3001"))
}