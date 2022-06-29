package handler

import "github.com/gofiber/fiber/v2"

// Hello hanlde api status
func Health(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"status": 200, "message": "Hello i'm ok!", "data": nil})
}