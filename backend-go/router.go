package main

import (
	"net/http"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/cases", authMiddleware(casesHandler))
	mux.HandleFunc("/api/analytics", authMiddleware(analyticsHandler))
	mux.HandleFunc("/api/reports", authMiddleware(reportsHandler))
	return mux
}
