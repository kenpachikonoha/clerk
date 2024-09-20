package auth

import (
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gin-gonic/gin"
)

func ProtectedRoute(c *gin.Context) {
	usr, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
		return
	}

	user, ok := usr.(*user.Client)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user type assertion failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user_id":     user,
		"user_banned": user.Backend,
	})
}
