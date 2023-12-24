const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
})

app.post("/khalti-api", async (req, res) => {
  const payload = req.body;
  const khaltiResponse = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', payload, 
  {
    headers: {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
    }
  });
  
  if (khaltiResponse) {
    res.json({
      success: true,
      data: khaltiResponse?.data
    })
  } else {
    res.json({
      success: false,
      message: 'something went wrong'
    })
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listening on ${PORT}`))