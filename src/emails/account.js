  const sgMail = require('@sendgrid/mail')

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: "byakykts@gmail.com",
    from: "byalykt@hotmail.com",
    subject: "Hello, World!",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis magna erat, sed mattis libero auctor non. Nullam sed ligula sit amet tellus vestibulum condimentum at quis diam. Donec ultricies consequat massa nec porta. Nullam congue sapien ut magna euismod, in accumsan nibh hendrerit. Nullam molestie, nisl a tincidunt pellentesque, mauris massa hendrerit ipsum, sed pretium diam tellus vitae tellus. Praesent porta ante id sem scelerisque, ut ornare nisl ullamcorper. Aliquam a elit convallis est cursus scelerisque. Nullam ut est velit. Integer pretium velit lacus, ac scelerisque libero efficitur eu. Nam scelerisque nisi mi, eu ultricies massa pellentesque vitae.",
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  }

  sgMail
    .send(msg)
    .then(() => {
    console.log('Email sent')
  })
    .catch((e) => {
    console.error(e)
  })
