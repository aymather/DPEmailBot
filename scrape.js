// Requires
const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');
const sendMail = require('./sendMail.js');

module.exports = function scrape(url){

    // Parse existing data into an object and extract current title
    // for later use
    var obj = JSON.parse(fs.readFileSync('./scrapeData.json', 'utf8'));
    var title = obj[url].title

    // Request a promise
    rp(url)
        
        // parse html once promise has resolved
        .then((html) => {

            // Load with cheerio selector
            $ = cheerio.load(html);

            // Get most current most recent title
            return info = $('span .ui_qtext_rendered_qtext')[0].children[0].data;
            
        })

        .then(info => {

            console.log(info);

            // Compare that title to stored title
            // If they're different, send mail
            if (info !== title){

                // Platform published on
                const publishedOn = $('div .CredibilityFacts')[0].children[3].children[0].data;

                // Link to article
                const href = $('div .CredibilityFacts')[0].children[3].attribs.href;

                // Reset the data inside json file and write to file system
                obj[url].title = info;
                var content = JSON.stringify(obj,undefined,2);
                fs.writeFileSync('./scrapeData.json',content,'utf8',(err)=>{
                    console.log('something went wrong');
                })

                // Send mail
                sendMail(obj[url].email, publishedOn, href, obj[url].name);
            }
        })
        
        // Catch errors and log them
        .catch(error => {

            console.log(`Our Error is: ${error}`);

        });
        
};