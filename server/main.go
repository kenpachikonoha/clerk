package main

import (
	"os"

	"github.com/delavalom-labs/server/api"
	"github.com/delavalom-labs/server/config"
	"github.com/rs/zerolog/log"
)

func main() {
	config := config.LoadConfig(".")

	server, err := api.NewServer(config)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to create server")
	}
	port := envPortOr("8080")
	server.Start(port)
}

func envPortOr(port string) string {
	if envPort := os.Getenv("PORT"); envPort != "" {
		return ":" + envPort
	}
	return ":" + port
}
