const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const welcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'byalykt@hotmail.com',
    subject: 'Thanks for joining in!',
    html: `
    <div style="text-align: center; background-color: #f2f2f2; padding: 20px;">
      <h1>Welcome to Task Website</h1>
    </div>
    <div style="text-align: center; padding: 20px;">
      <p>Dear ${name},</p>
      <p>We are excited to welcome you to my Task Website! I am dedicated to helping users find and complete tasks, making your academic working journey smoother and more enjoyable.</p>
      <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:byalykt@hotmail.com">byalykt@hotmail.com</a>.</p>
      <p>Thank you for choosing my Task Website. We wish you the best of luck in your academic endeavors!</p>
      <p>Sincerely,</p>
      <p>Taras Byalyk</p>
    </div>
    `,
    }).then(() => {
    console.log('Email sent')
  }).catch((e) => {
    console.error(e)
  })
}

const farewellEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'byalykt@hotmail.com',
    subject: 'Account Deletion Confirmation',
    html: `
      <div style="text-align: center; background-color: #f2f2f2; padding: 20px;">
        <h1>Farewell from Task Website</h1>
      </div>
      <div style="text-align: center; padding: 20px;">
        <p>Dear ${name},</p>
        <p>We're sad to see you go from Task Website ☹. Your account has been successfully deleted.</p>
        <p>We value your feedback and would like to know if there was something we could have done differently to make your experience better. Your feedback is important to us.</p>
        <p>If you have any suggestions or comments, please feel free to reply to this email or contact our support team at <a href="mailto:byalykt@hotmail.com">byalykt@hotmail.com</a>.</p>
        <p>Thank you for being a part of our community. We wish you the best in your future endeavors.</p>
        <p>Best regards,</p>
        <p>Taras Byalyk</p>
      </div>
    `,
  }).then(() => {
    console.log('Email sent')
  }).catch((e) => {
    console.error(e)
  })
}

module.exports = {
  welcomeEmail,
  farewellEmail
}