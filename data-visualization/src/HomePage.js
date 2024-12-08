import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchTime, setSearchTime] = useState(0); // Store search duration

  const handleSearch = async () => {
    if (searchTerm) {
      const startTime = performance.now(); // Start timing
      
      try {
        const response = await axios.post("http://127.0.0.1:5000/search", { query: searchTerm });
        const endTime = performance.now(); // End timing

        setResults(response.data.results || []);
        setSearchTime(endTime - startTime); // Save raw value for display
        console.log(`Results found in ${endTime - startTime} milliseconds.`);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          Superstore Analytics
        </Typography>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <TextField
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        />
      </motion.div>

      {/* Timer Display */}
      {searchTime > 0 && (
        <Typography
          variant="h6"
          sx={{
            marginTop: "40px",
            color: "#00b300",
            fontWeight: "bold",
          }}
        >
          Results found in{" "}
          {searchTime < 1000
            ? `${searchTime} milliseconds`
            : `${(searchTime / 1000).toFixed(2)} seconds`}
        </Typography>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: "40px", width: "100%", maxWidth: "800px" }}
        >
          <Card
            sx={{
              backgroundColor: "#00b300",
              color: "#fff",
              boxShadow: 3,
              borderRadius: "10px",
              padding: "20px",
              overflowX: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Search Results:
            </Typography>
            <Typography variant="body2" component="div" sx={{ whiteSpace: "pre-line" }}>
              {results.join("\n")}
            </Typography>
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default HomePage;
