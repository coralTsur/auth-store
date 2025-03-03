// server.js
const express = require('express');
const app = express();
const port = 5000; // הפורט שבו השרת יפעל

// פונקציה שמחזירה תגובה פשוטה
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
