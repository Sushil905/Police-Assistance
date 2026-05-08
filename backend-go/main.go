package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	router := NewRouter()
	host := os.Getenv("HOST")
	if host == "" {
		host = "127.0.0.1"
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	addr := host + ":" + port

	log.Printf("Go case service listening on http://%s\n", addr)
	if err := http.ListenAndServe(addr, router); err != nil {
		log.Fatal(err)
	}
}
