import express from 'express';
import bodyParser from 'body-parser';
import { create } from 'express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
import sendRoute from './api/routes/sendRoute.js';

dotenv.config();
const app = express();
const hbs = create();

const __dirname = path.dirname('public');

// View Engine Setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route for the root endpoint
app.get('/', (req, res) => {
	res.render('contact', { layout: false });
});

app.use('/', sendRoute);

// Server initialization
app.listen(5000, () => console.log('Running from Port 5000'));
