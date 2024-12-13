import React, { useState } from "react"; 
import axios from "axios"; // used to connect to backend
import { Box, TextField, Typography, Card } from "@mui/material"; // includes components for visual elements
import { motion } from "framer-motion"; //used for adding animations

const HomePage = () => {
  //initial state for the search field
  const [searchTerm, setSearchTerm] = useState("");

  //stores the search results
  const [results, setResults] = useState([]);

  // stores the time taken to get the search results
  const [searchTime, setSearchTime] = useState(0);

  //handles the search logic
  const handleSearch = async () => {
    if (searchTerm) {
      //starts recording the time after a search has been made
      const startTime = performance.now(); 
      try {
        //makes an http post request to the backend server with the search term
        //connected via axios
        const response = await axios.post("http://127.0.0.1:5000/search", { query: searchTerm });
        //stops the timer after backend replies
        const endTime = performance.now(); 
        //updates the results with data received from the backend
        setResults(response.data.results || []); 
        //calculate the time taken
        setSearchTime(endTime - startTime); 
        //logs the time in the console for testing
        console.log(`Results found in ${endTime - startTime} milliseconds.`); 
      } catch (error) {
        //handle errors
        console.error("Error fetching search results:", error); 
      }
    }
  };

  //ui
  return (
    //create a box from mui with various attributes for a frontend page
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
     {/* box animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} //inital state makes elements appear and animate upwards
        animate={{ opacity: 1, y: 0 }} //final animation state 
        transition={{ duration: 0.8 }} //duration of 0.8 seconds for transition
      >
        <Typography
          variant="h2" //various attributes for text
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

      {/* search bar animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} //same as before
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6 }} 
        style={{ width: "100%", maxWidth: "500px" }} 
      >
        <TextField
          variant="outlined" //more attributes
          placeholder="Search products..." //placeholder text for the input field
          value={searchTerm} //input linked to the searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} //update the state when inputted 
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} //start search when the enter pressed
          sx={{
            width: "100%", 
            backgroundColor: "#fff", 
            borderRadius: "5px", 
          }}
        />
      </motion.div>

      {/* timer section */}
      {searchTime > 0 && ( //only show the timer when searched
        <Typography
          variant="h6" //text attributes
          sx={{
            marginTop: "40px", 
            color: "#00b300", 
            fontWeight: "bold", 
          }}
        >
          Results found in{" "}
          {searchTime < 1000
            ? `${searchTime} milliseconds` //display time in milliseconds if its under 1 second then convert to seconds if time exceeds 1 second
            : `${(searchTime / 1000).toFixed(2)} seconds`}
        </Typography>
      )}

      {/* search results */}
      {results.length > 0 && ( //shows results if there are any
        <motion.div
          initial={{ opacity: 0, y: 50 }} //more animation
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          style={{ marginTop: "40px", width: "100%", maxWidth: "800px" }}
        >
          <Card
            sx={{
              backgroundColor: "#00b300", //attributes for the card displaying the result
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
            <Typography
              variant="body2" //text attriubtes
              component="div" 
              sx={{ whiteSpace: "pre-line" }}
            >
              {results.join("\n")} {/* display results separated by newline */}
            </Typography>
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default HomePage;
