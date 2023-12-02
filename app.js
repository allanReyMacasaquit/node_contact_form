import express from 'express';
import bodyParser from 'body-parser';
import expressHandlebars from 'express-handlebars';
import nodemailer from 'nodemailer';

const app = express();
//View Engine Setup
app.engine('handlebars', expressHandlebars);
app.set('view engine', 'handlebars');

//Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(5000, () => console.log('Running from Port 5000'));
