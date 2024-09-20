package config

import (
	"fmt"
	"os"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/spf13/viper"
)

// Config stores all configuration of the application.
// The values are read by viper from a config file or environment variable.
type Config struct {
	ClerkApiKey string `mapstructure:"CLERK_API_KEY"`
}

// LoadConfig reads configuration from file or environment variables.
func LoadConfig(path string) (config Config) {
	viper.AddConfigPath(path)
	viper.SetConfigFile(".env")
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		fmt.Println("Error: ", err)
	}

	// Set default values for config if .env file is not found
	viper.SetDefault("CLERK_API_KEY", os.Getenv("CLERK_API_KEY"))

	viper.Unmarshal(&config)

	clerk.SetKey(config.ClerkApiKey)

	return
}
