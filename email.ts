import Email from "https://smtpjs.com/v3/smtp.js";
import { EmailerSettings } from './settings'
import { Setting } from 'obsidian';
import  Utilities  from './utilities/Utilities';
import nodemailer from 'nodemailer';

// try {
//   const nmailer = require('node_modules/nodemailer');
// } catch (e) {
//   if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
//       console.log(e);
//       console.log("Can't load nodemailer!");
//   }
// }

/* SmtpJS.com - v3.0.0   A0B577E3687C5471EB86040632239117EDDFE6418C84F1525C3391B98D38E4192FDBCF4F8201F28BB187B46D9D422C0F   fnqcqzcwopczxxjd*/
  
export class Emailer {

    emailWorks: boolean = true;
    
    message: string;
    html: string;
    to: string;
    from: string;
    subject: string;
    settings: EmailerSettings;
    attachments: Object[];

    constructor() {
        this.message = "";
        this.html = null;
        this.to = "";
        this.from = "";
        this.subject = "";
        this.attachments = [];
	  }
    
    setMessage(msg: string) {
        this.message = msg;
    }

    setMessageHTML(html: string) {
        this.html = html;
    }

    addAttachment(path: string, filename="gb.txt", contentType="text/plain") {
        let attachment = {
            'name': filename,
            //'contentType': contentType,
            'path': path
        };
        this.attachments.push(attachment);
    }

    sendmail(to: string, from: string, subject: string, message: string, settings: EmailerSettings, 
             errCallback: (errinfo) => void): void {

        this.to = to;
        this.from = from;
        this.subject = subject;
        if (message != null) this.message = message;

        console.log("Sending "+message)
        console.log("To: "+to)

        let mailOptions = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            headers: {"X-GradeBox-Version": "Obsidian Version 1.0", "X-dev": "frethop"},
            text: this.message,
            attachments: this.attachments,
            html: this.html,
            //Body: this.message,
            //Username: settings.username,
            //Password: settings.password,
        };
        console.log(mailOptions);

          if (this.emailWorks) {
        const transporter = nodemailer.createTransport({
            service: settings.service,
            host: settings.smtphost,
            port: Number(settings.smtpport),
            secure: settings.secure, 
            auth: {
              user: settings.username,
              pass: settings.password  
            }
          });
        let count = 0;
        //while (count < 5) 
          transporter.sendMail(mailOptions, async function(error: any, info: { response: string; }){
            if (error) {
              console.log("SENDMAIL ERROR: #"+count+": "+error);
              count ++;
              await Utilities.sleep(2000);
              errCallback(error);
            } else {
              count = 5
              console.log('Email sent: ' + info.response);
            }
          });
          
        }        
    }  
    
}
