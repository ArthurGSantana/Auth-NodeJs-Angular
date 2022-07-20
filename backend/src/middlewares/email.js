import nodemailer from 'nodemailer';

const configEmailProd = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true
}

const configEmailTest = (testAccount) => ({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: testAccount,
  tls: {
    rejectUnauthorized: false
  }
})

async function createConfigEmail() {
  if(process.env.NODE_ENV === 'production') {
    return configEmailProd;
  } else {
    const testAccount = await nodemailer.createTestAccount();
    return configEmailTest(testAccount);
  }
}

class Email {

  async sendEmail(user) {
    const configEmail = await createConfigEmail();
    const transporter = nodemailer.createTransport(configEmail)
  
    const info = await transporter.sendMail(this)
  
    if(process.env.NODE_ENV !== 'production')
    console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
}

class CheckEmail extends Email {
  constructor(user, address) {
    super();
    this.from = '"Space-Ship" <noreply@spaceship.com.br>';
    this.to = user.email;
    this.subject = 'Verificação de Email';
    this.text = `Olá! Verifique seu e-mail aqui: ${address}`;
    this.html = `<h1>Olá!</h1> Verifique seu e-mail aqui: <a href="${address}">${address}</a>`;
  }
}

export default CheckEmail;