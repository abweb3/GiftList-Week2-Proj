import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import main from "./client/index";

const serverUrl = "http://localhost:1225";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gift = await main(name); // Call the main function instead of directly using axios
      setMessage(gift);
    } catch (error) {
      setMessage("Error: Could not connect to the server.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" mb={3}>
        Merkle Tree Gift List 🎁
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Check if you're on the list
          </Button>
        </Box>
      </form>
      {message && (
        <Typography variant="h6" mt={3}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default App;
