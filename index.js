const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/sk', (req, res) => {
    res.send('Sandeep Kumar');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)

// deployement code
if(process.env.NODE_ENV === "production"){
    const dirPath = path.resolve();

    app.use(express.static("./frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath, "./frontend/build","index.html"));
    })
}

//server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})