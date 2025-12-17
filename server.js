const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight)
  const height = parseFloat(req.body.height)

  const bmi = weight / (height * height)
  let category = ''

  if (bmi < 18.5) category = 'Underweight'
  else if (bmi < 25) category = 'Normal weight'
  else if (bmi < 30) category = 'Overweight'
  else category = 'Obese'

  res.send(`
    <html>
      <head>
        <title>BMI Result</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="result-page">
          <div class="result-box">
            <h1>BMI Result</h1>
            <p>Your BMI is ${bmi.toFixed(2)}</p>
            <p class="${category.toLowerCase().replace(' ', '')}">${category}</p>
            <a href="/">Back</a>
          </div>
        </div>
      </body>
    </html>
  `)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
