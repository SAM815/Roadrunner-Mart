const nodeMailer = require('nodemailer');
const { google } = require('googleapis');

//since we're sending an object of options
//see in user.js/controllers/forgotpassword function

const CLIENT_ID = process.env.CLIENT_ID; 
const CLIENT_SECRET = process.env.CLIENT_SECRET; 
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;



const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

/*
sendEmail()

NAME
    sendEmail

SYNOPSIS
    sendEmail(options);

DESCRIPTION
    This function sends an email using NodeMailer with Gmail's OAuth2 authentication.
    It uses the provided options to configure the email details such as recipient, subject, and message.
    The OAuth2 client credentials are retrieved from environment variables.
    It generates an access token and uses it for authentication with Gmail.
    Finally, it sends the email with the configured transporter.

PARAMETERS
    options - An object containing the email details:
        - email: The recipient's email address.
        - subject: The subject of the email.
        - message: The body text of the email.

RETURNS
    This function does not return a value. It sends the email asynchronously.
*/

exports.sendEmail = async (options) => {

   const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.SMPT_MAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);

}