import nodemailer from 'nodemailer';

export async function sendEmail(req, res) {
	const { name, email, phone, company, message } = req.body;

	try {
		// Create a transporter using nodemailer - Update with your email service provider details
		const transporter = nodemailer.createTransport({
			service: 'gmail', // Update with your email service (e.g., 'gmail', 'hotmail')
			auth: {
				user: 'email', // Update with your email address
				pass: 'pass', // Update with your email password or app-specific password
			},
		});

		// Email message details
		const mailOptions = {
			from: { email }, // Sender email address
			to: 'allanrey.macasaquit@gmail.com', // Receiver email address
			subject: 'New Contact Form Submission', // Email subject
			text: `
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Company: ${company}
                Message: ${message}
            `,
			html: `
        <html>
        <head>
            <style>
                /* CSS styles for the email body */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                .details {
                    margin-top: 20px;
                    line-height: 1.6;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>New Contact Form Submission</h1>
                <div class="details">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            </div>
        </body>
        </html>
    `,
		};

		// Send email using nodemailer and handle the Promise
		transporter
			.sendMail(mailOptions)
			.then((info) => {
				console.log('Email sent: ', info.messageId);
				// Respond with a success message
				res.status(200).json({ message: 'Email sent successfully!' });
			})
			.catch((error) => {
				console.error('Error sending email: ', error);
				// Respond with an error message
				res.status(500).json({ error: 'Failed to send email' });
			});
	} catch (error) {
		console.error('Error sending email: ', error);
		// Respond with an error message
		res.status(500).json({ error: 'Failed to send email' });
	}
}
