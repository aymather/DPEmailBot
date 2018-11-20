// Requires
const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');
const sendMail = require('./sendMail.js');

module.exports = function scrape(url){

    var obj = JSON.parse(fs.readFileSync('./scrapeData.json', 'utf8'));
    var title = obj[url].title

    rp(url)
        
        .then((html) => {
            $ = cheerio.load(html);
            return info = $('span .ui_qtext_rendered_qtext', html)[0].children[0].data;
        })

        .then((info) => {
            if (info !== title){
                const publishedOn = $('div .CredibilityFacts', html)[0].children[3].children[0].data;
                const href = $('div .CredibilityFacts', html)[0].children[3].attribs.href;
                obj[url].title = info;
                console.log(info);
                var content = JSON.stringify(obj,undefined,2);
                fs.writeFileSync('./scrapeData.json',content,'utf8',(err)=>{
                    console.log('something went wrong');
                })
                var subject = `Congrats ${obj[url].name}! You've been republished!`;
                var html = 'Congrats!'
                sendMail(obj[url].email, subject, html, publishedOn, href, obj[url].name);
            }
        })
        
        .catch(error => {

            console.log(`Our Error is: ${error}`);

        });
        
};