package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Config func to get env value
func Config(key string) string {
	// load .env file
	if (os.Getenv("env") != "production") {
		err := godotenv.Load(".env.local")
		if err != nil {
			fmt.Print("Error loading .env file")
		}
	}
	
	return os.Getenv(key)
}