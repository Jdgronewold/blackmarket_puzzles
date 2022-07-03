package database

import (
	"blackmarket_puzzles/config"
	"blackmarket_puzzles/model"
	"encoding/json"
	"fmt"
	"os"
	"strconv"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// ConnectDB connect to db
type awsConfig struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Host string `json:"host"`
	Port uint `json:"port"`
	DBName string `json:"dbName"`
}

func ConnectDB() {

	// var db_user string
	var db_password string
	var db_name string
	var address string

	var dbCreds awsConfig
	fmt.Printf("connecting to db in %s environment", os.Getenv("env"))

	if (os.Getenv("env") == "production") {
		variables := os.Getenv("db_creds")
		fmt.Printf("variables: %s", variables)
		err := json.Unmarshal([]byte(variables), &dbCreds)
		if err != nil {
			fmt.Println("JSON decode error!")
			panic("failed to parse json")
	}
		// fmt.Printf("db use: %s", db_user)
		db_user := dbCreds.Username
		fmt.Printf("db user: %s", db_user)
		db_password = dbCreds.Password
		fmt.Printf("db pass: %s", db_password)
		db_name = "bmp_db" // fix later
		fmt.Printf("db name: %s", db_name)
		address = fmt.Sprintf( "%s:%d", dbCreds.Host, dbCreds.Port)
		fmt.Printf("address: %s", address)
		dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", db_user, db_password, address, db_name)
		fmt.Printf(" dsn: %s", dsn)
		fmt.Printf(" and hereee ")
		DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			fmt.Printf("    Error %s", err.Error())
			panic("failed to connect database")
		}

		fmt.Println("Connection Opened to Database")
		
	} else {
		db_user := config.Config("DB_USER")
		db_password = config.Config("DB_PASSWORD")
		db_name =config.Config("DB_NAME")
		p := config.Config("DB_PORT")
		port, err := strconv.ParseUint(p, 10, 32)
		if err != nil {
			panic("failed to read port from env")
		}
		address = fmt.Sprintf("127.0.0.1:%d", port)

		dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", db_user, db_password, address, db_name)

		DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

		if err != nil {
			panic("failed to connect database")
		}

		fmt.Println("Connection Opened to Database")
		DB.AutoMigrate(&model.User{})
		DB.AutoMigrate(&model.Puzzle{})
		fmt.Println("Database Migrated")

	}

	
 	// dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", db_user, db_password, address, db_name)

	// // dsns := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", )
	// DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	// if err != nil {
	// 	panic("failed to connect database")
	// }

	// fmt.Println("Connection Opened to Database")
	// DB.AutoMigrate(&model.User{})
	// fmt.Println("Database Migrated")
}