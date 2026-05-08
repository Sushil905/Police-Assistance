package main

import (
	"encoding/json"
	"net/http"
)

type CaseSummary struct {
	CaseID      int    `json:"case_id"`
	ComplaintID int    `json:"complaint_id"`
	Status      string `json:"status"`
	OfficerName string `json:"officer_name"`
}

type AnalyticsPayload struct {
	CategoryCounts map[string]int `json:"category_counts"`
	MonthlyCounts  map[string]int `json:"monthly_counts"`
	StatusCounts   map[string]int `json:"status_counts"`
}

func casesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	data := []CaseSummary{
		{CaseID: 1, ComplaintID: 101, Status: "Investigating", OfficerName: "Officer Sharma"},
		{CaseID: 2, ComplaintID: 102, Status: "Pending", OfficerName: "Officer Singh"},
	}

	writeJSON(w, data)
}

func analyticsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	payload := AnalyticsPayload{
		CategoryCounts: map[string]int{"Theft": 24, "Assault": 12, "Fraud": 8},
		MonthlyCounts:  map[string]int{"Jan": 18, "Feb": 22, "Mar": 27},
		StatusCounts:   map[string]int{"Pending": 10, "Investigating": 8, "Solved": 12, "Closed": 4},
	}

	writeJSON(w, payload)
}

func reportsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	report := map[string]interface{}{
		"total_cases":       56,
		"solved_percentage": 64,
		"open_complaints":   20,
	}

	writeJSON(w, report)
}

func writeJSON(w http.ResponseWriter, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payload)
}

func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		key := r.Header.Get("x-api-key")
		if key != "internal-service-key" {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{"error": "invalid api key"})
			return
		}
		next(w, r)
	}
}
