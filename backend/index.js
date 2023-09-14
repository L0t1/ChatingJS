const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios library

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "ce046abf-a155-45f7-a520-b5b1a542bca3" } } // Fix the typo here (headers instead of header)
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    // Handle axios error by sending an appropriate status code and error message
    return res.status(e.response ? e.response.status : 500).json({
      error: e.message,
    });
  }
});

app.listen(3001);
