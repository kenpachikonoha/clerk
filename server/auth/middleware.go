package auth

import (
	"log"
	"net/http"
	"strings"

	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gin-gonic/gin"
)

type UserInfo struct {
	UserID     string
	UserEmail  string
	UserBanned bool
}

func ClerkAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		sessionToken := strings.TrimPrefix(c.Request.Header.Get("Authorization"), "Bearer ")
		claims, err := jwt.Verify(c, &jwt.VerifyParams{
			Token: sessionToken,
		})
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"Error":   "Unauthorized",
				"Message": "Not authorized, please login first.",
			})
			c.Abort()
			return
		}

		usr, err := user.Get(c.Request.Context(), claims.Subject)
		if err != nil {
			log.Println("Error fetching user:", err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		// Set the userInfo to the context
		userInfo := UserInfo{
			UserID:     usr.ID,
			UserEmail:  usr.EmailAddresses[0].EmailAddress,
			UserBanned: usr.Banned,
		}

		c.Set("user", userInfo)

		c.Next()
	}
}
