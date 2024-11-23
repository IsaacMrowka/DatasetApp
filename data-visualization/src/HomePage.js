import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Card, MenuItem, Grid } from "@mui/material";
import { motion } from "framer-motion";

// Static mock data with dictionary-style categories
const mockData = {
  Country: ["USA", "Canada", "Mexico", "Germany", "France"],
  ProductID: ["P123", "P456", "P789", "P101", "P112"],
  Address: ["123 Elm St", "456 Oak St", "789 Pine St", "101 Maple Ave"],
  DeliveryID: ["D001", "D002", "D003", "D004"],
};

const HomePage = () => {
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [searchTime, setSearchTime] = useState(0); // Store search duration

  // Update dropdown options
  useEffect(() => {
    if (searchTerm) {
      const filteredOptions = Object.keys(mockData).filter((key) =>
        key.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDropdownOptions(filteredOptions);
    } else {
      setDropdownOptions([]);
    }
  }, [searchTerm]);

  const handleSearch = (category) => {
    if (category) {
      const startTime = performance.now(); // Start timing
  
      setTimeout(() => {
        setResults(mockData[category] || []);
        const endTime = performance.now(); // End timing
        const preciseTime = endTime - startTime; // Full precision
        setSearchTime(preciseTime); // Save raw value for display
        console.log(`Results found in ${preciseTime} milliseconds.`);
      }); 
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

      {/* Search Bar with Dropdown */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <TextField
          variant="outlined"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && dropdownOptions.length > 0 && handleSearch(dropdownOptions[0])
          }
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        />
        {dropdownOptions.length > 0 && (
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: 1,
              borderRadius: "5px",
              marginTop: "4px",
              position: "absolute",
              zIndex: 10,
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {dropdownOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  setSearchTerm(option);
                  handleSearch(option);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Box>
        )}
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

      {/* Search Results in a Single Wide Blue Box */}
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Without Minhash:
                </Typography>
                <Typography variant="body2" component="div" sx={{ whiteSpace: "pre-line" }}>
                  {results.join("\n")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  With Minhash:
                </Typography>
                <Typography variant="body2" component="div" sx={{ whiteSpace: "pre-line" }}>
                  {/* Placeholder for future minhash results */}
                  (No results)
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default HomePage;
