package api

import (
	"github.com/delavalom-labs/server/auth"
	"github.com/delavalom-labs/server/config"
	"github.com/gin-gonic/gin"
)

// Server serves HTTP requests for our banking service.
type Server struct {
	config config.Config
	router *gin.Engine
}

// NewServer creates a new HTTP server a setup routing.
func NewServer(config config.Config) (*Server, error) {
	server := &Server{
		config: config,
	}
	server.setupRouter()
	return server, nil
}

func (server *Server) setupRouter() {
	router := gin.Default()

	users := router.Group("/hello")
	users.Use(auth.ClerkAuthMiddleware())

	{
		users.GET("/world", server.helloWorld)
	}

	server.router = router
}

// Start runs the HTTP server on a specific address.
func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
