const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Sheet = require('./sheet');
const nodemailer = require('nodemailer');

function main() {
const output = `
     <p>A Craigslist Post Was Found</p>
     <h3>Contact Details</h3>
     <ul>
       <li>Message: "Your Post was found"</li>
     </ul>
     <p>"Found"</p>

   `;

 let transporter = nodemailer.createTransport({
   service:'gmail',
   auth: {
     user: '',
     pass: ''
   },
    tls:{
      rejectUnauthorized:false
    }

 });


 // setup email data with unicode symbols
   let mailOptions = {
     from: '1nickperry@gmail.com' ,
     to: '1nickperry@gmail.com',
     subject: "Post Found!",
     text: "Your Post Was Found",
     html: output
   };

   // send mail with defined transport object
//    transporter.sendMail(mailOptions, (error, info) => {
//        if (error) {
//            return console.log(error);
//        }
//        console.log('Message sent: %s', info.messageId);
//        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//        res.render('home');

//    });

(async function () {
    const res = await fetch('https://westslope.craigslist.org/d/for-sale/search/sss');
    const search = ("cross");
    const text = await res.text();
    const found = text.includes(search);
    if (found == true) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
     
            res.render('home');
     
        });
    } else {
        console.log("Not Found");
    }

})()
}
function run() {
  setInterval(main, 1800000);
}

run();


// async function getPrice(url) {

//     const res = await fetch(url);
//     const text = await res.text();
//     const $ = cheerio.load(text);
//     const price = $('#quotes_summary_current_data span') .first() .text()
//     return price;
// }

// (async function() {
// const sheet = new Sheet();
// await sheet.load();
// const stocks = await sheet.getRows(0);
// const dayPrices = {};
// for (let stock of stocks) {
//     const price = await getPrice(stock.url);
//     dayPrices[stock.ticker] = price;
// }
// dayPrices.date = new Date().toDateString();
// await sheet.addRows([dayPrices], 1);
// })()
