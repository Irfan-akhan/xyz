API_KEY = '';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
	`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`
);
const msg = {
	to: 'test@example.com', // Change to your recipient
	from: 'booking@shuttlelane.com', // Change to your verified sender
	subject: 'Shuttlelane Booking',
	text: 'and easy to do anywhere, even with Node.js',
	html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail
	.send(msg)
	.then((res) => {
		console.log('Email sent');
		console.log('Email', res);
	})
	.catch((error) => {
		console.error('mail- error', error);
	});
