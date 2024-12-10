const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios"); 
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 50001;

// Load environment variables
dotenv.config();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// MongoDB Atlas connection string
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("Error connecting to MongoDB Atlas: ", err));

// Define reCAPTCHA secret key
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;  

// Route to handle form submission with CAPTCHA verification
app.post('/submit', async (req, res) => {
    const captchaResponse = req.body['g-recaptcha-response'];

    // Verify reCAPTCHA with Google's API
    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: RECAPTCHA_SECRET_KEY,
                    response: captchaResponse,
                },
            }
        );

        if (response.data.success) {
            // CAPTCHA was solved successfully
            res.send('Form submitted successfully!');
        } else {
            // CAPTCHA failed
            res.send('Captcha verification failed. Please try again.');
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/', Routes);

// Startting the server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
