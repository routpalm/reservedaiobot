const puppeteer = require('puppeteer-extra');

let name = "";
let email = "";
let tel = "";
let address = "";
let zip = "";
let city = "";
let state = "";
let country = "";
let card = "";
let rawCard = ";"
let expMonth = "";
let expYear = "";
let cvv = "";
const itemType = "t-shirts";
const itemSubType = "wear";
const qty = "1";
const itemSize = "M";
const keyword1 = "Motion";
const keyword2 = "Logo";

function fetchData(profName) {
    let rawProfileText = fs.readFile(`./profiles/${profName}.pf`, 'utf8', function read(err, data) {
        if (err) throw err;

        const content = data;
        let rawSplitData = content.split("\n");
        name = rawSplitData[0];
        email = rawSplitData[1];
        tel = rawSplitData[2];
        address = rawSplitData[3];
        zip = rawSplitData[4];
        city = rawSplitData[5];
        state = rawSplitData[6];
        rawCard = rawSplitData[7];
        card=rawCard.match(/.{1,4}/g);
        expMonth = rawSplitData[8];
        expYear = rawSplitData[9];
        cvv = rawSplitData[10];

        console.log(rawSplitData);


    });
    fs.close(0, (err) => { 
        if (err) 
          console.error('Failed to close file', err); 
        else { 
          console.log("\n> File Closed successfully"); 
        }
     });
    console.log(rawProfileText);
}
async function initiate(profName){
    fetchData(profName)
    try {

        const browserURL = 'http://127.0.0.1:9222';
        const browser = await puppeteer.connect({browserURL})

        // Opens new tab
        const page = await browser.newPage();

        page.setDefaultTimeout(1800000);
        
        // Navigates to shop page that is indicated by the item type provided by the user
        await page.goto(`https://www.supremenewyork.com/shop/all/${itemType}`);
        page.waitForNavigation({ waitUntil: 'networkidle0'});
        
        //Checks page for link text that matches keywords and clicks on it
        async function findLink(page, keyword) {
            const links = await page.$$('a')
            for (var i=0; i < links.length; i++) {
            let valueHandle = await links[i].getProperty('innerText');
            let jsonKeyword = await valueHandle.jsonValue();
            const linkString = jsonKeyword.toString();

            let valueLink = await links[i].getProperty('href');
            let jsonKeywordLink = await valueLink.jsonValue();
            const link = jsonKeywordLink.toString();
    //         console.log("test ", keyword, keywordLink);

            if (linkString.includes(keyword)) {
                console.log("Item found");
            await page.goto(link);
                break;
            }
            }
            return null;
        }
        async function findLinkTwoKeywords(page, keyword1, keyword2) {
            const links = await page.$$('a')
            for (var i=0; i < links.length; i++) {
            let valueHandle = await links[i].getProperty('innerText');
            let jsonKeyword = await valueHandle.jsonValue();
            const linkString = jsonKeyword.toString();

            let valueLink = await links[i].getProperty('href');
            let jsonKeywordLink = await valueLink.jsonValue();
            const link = jsonKeywordLink.toString();
    //         console.log("test ", keyword, keywordLink);

            if (linkString.includes(keyword1 && keyword2)) {
                console.log("Item found");
            await page.goto(link);
                break;
            }
            }
            return null;
        }
        async function findLinkTwoKeywords(page, keyword1) {
            const links = await page.$$('a')
            for (var i=0; i < links.length; i++) {
            let valueHandle = await links[i].getProperty('innerText');
            let jsonKeyword = await valueHandle.jsonValue();
            const linkString = jsonKeyword.toString();

            let valueLink = await links[i].getProperty('href');
            let jsonKeywordLink = await valueLink.jsonValue();
            const link = jsonKeywordLink.toString();
    //         console.log("test ", keyword, keywordLink);

            if (linkString.includes(keyword1)) {
                console.log("Item found");
            await page.goto(link);
                break;
            }
            }
            return null;
        }
        //Finds link using two keywords
        //findLinkTwoKeywords(page, keyword1, keyword2);
        
        findLinkOneKeyword(page,keyword1);

        page.waitForNavigation({ waitUntil: 'networkidle0'});
        await page.waitFor(1500);

        if (itemSubType == "shoe") {
            if (itemSize == 'S') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Small"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
            else if (itemSize == 'M') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Medium"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
            else if (itemSize == 'L') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Large"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }        
            else if (itemSize == 'XL') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "XLarge"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
        }

        if (itemSubType == "wear") {        
            if (itemSize == 'S') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Small"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
            else if (itemSize == 'M') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Medium"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
            else if (itemSize == 'L') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Large"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
            else if (itemSize == 'XL') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "XLarge"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
        }

        if (itemSubType == "misc") {
            await page.click('input.button');
        }

        if (itemSubType == "miscWithQuantity") {
            await page.select('select#qty', qty);
            await page.click('input.button');
        }

        if (itemSubType == "miscWithSizeAndQuantity") {
            if (itemSize == 'S') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Small"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
            else if (itemSize == 'M') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Medium"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
            else if (itemSize == 'L') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "Large"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }        
            else if (itemSize == 'XL') {
                const option = (await page.$x('//*[@id = "s"]/option[text() = "XLarge"]'))[0];
                const value = await (await option.getProperty('value')).jsonValue();
                await page.select('select#s', value);
                await page.select('select#qty', qty);
                await page.click('input.button');
            }
        }
        // User input to prevent bot detection
        await page.waitFor(100);

        // Clicks check-out button
        await page.waitForSelector('a.button.checkout');
        await page.click('a.button.checkout');

        //Waits for checkout page to load
        page.waitForNavigation({ waitUntil: 'networkidle0'});
        page.waitFor(4500);
        
        //Autofills user data
        await page.type('#order_billing_state', state);
        page.waitFor(100);
        await page.type('#order_billing_name', name);
        page.waitFor(50);
        await page.type('#order_email', email);
        page.waitFor(50);
        await page.type('#order_tel', tel);
        page.waitFor(500);
        console.log(address);
        await page.type('#bo.string.required', address);
        page.waitFor(500);
        await page.type('#order_billing_zip', zip);
        page.waitFor(50);
        await page.type('#order_billing_city', city);
        page.waitFor(50);
        await page.type('#rnsnckrn.string.required', card);
        page.waitFor(50);
        await page.type('#credit_card_month', expMonth);
        page.waitFor(50);
        await page.type('#credit_card_year', expYear);
        page.waitFor(50);
        await page.type('#orcer.string.required', cvv);
        page.waitFor(50);
        await page.click('#order_terms.checkbox');
        page.waitFor(1000);
        setTimeout(async () => {
            await page.click('input.button').then(console.log('Clicked'))
            await page.waitFor(1000)
        }, 750); 
        
    }
    catch (err) {
        console.log(err);
    }
}