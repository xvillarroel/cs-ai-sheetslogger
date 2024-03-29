//https://ytzivrzj76ejwc2vdbnzwladdm0nvubi.lambda-url.us-east-1.on.aws/

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const globals = {
    SERVICEACCOUNTAUTH: new JWT({
        email:  'javascript-writer@groupsproject-370909.iam.gserviceaccount.com',
        key:    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtAUZp72L3zq+6\nGdBUrgGqs7kbUtWx0mKHfdMiliRsLe6wj0UYdhSqU/Nd505ic0EGRwrhxL3rq4FV\nIQI5creAGfNWzOZKtAPMV4YoSqN8HgfvF/DrLgGAwScn56dVituCOxv4j9pXQIIo\nMiIm9O13mWlEBEFjw+jXP/Z+6M7Rgk25lDZR0/1A/KX5eG/XJ0fmcC+TSM0NpS6V\nKrbqHweFfgLDTbUqsf8TUOqLFJ0Qaj7VBuGjd9yp9+icZ68giksMuyFdqlo4MKD6\ns2WW3YR2NeSbQ/+D+6IGWyts+9NA9OVDazaT1nJ6+KYO+Oq6c1l8lxS9ur01JrSU\nPIP1PLTjAgMBAAECggEAOG8MCw5dmDxBslEtVhIU1RwfK7yPnJvmLBBtSQD1DJzH\nGa0CewI5p34PCvii5xZ1hZizAgZtdWzSmXRVB2xWU2EjsZLRJFkoTAXY61e9kIUz\nTVjf67dsIhXfsfKs8QiEpiyl6STzsjaGvpnr7g1DURon7ln9ApAraduhirBilpCD\ne6HpFv81gRT+2ujzFvWWW4NE0E2uy8LxnOxSyFGOpK4PUWPpoJuLf52MCwOae+oB\nRXKpxjMjM9kBJ4Rex9ugR6ETwkf1JDQfa/uM/cOlEQjqS9rp20jbZCWPtYfSpLt0\n+nr+TfM+nGYYu0zWRLH6mTHVnHGItFcjUAQTIZdk0QKBgQDWYglr4IIAZh6BYe/z\nbXI+mQN9UbkTzQ691abyjY5pUEu0lKd/HrYwS0Phzj+5lhaUtrEvbN0HclaTCEd7\n10v0m30jiwJPQDmu9RXj6Tl3qKb2rxnHLviX9ypJ7mkDHO7KTRDahVvm6jZmcHnR\nzNA/9mYLpiVNpGQakoyVVX3vrQKBgQDOluu1C2j5PCuGkmkEEOSb4uZt9MvTGdDi\ns/7fcPEyPS/1Vbh/IrKwBBSnfpcUfCpD1dC8YbQhjsHewdPqnpiOHFj9hOsoQeH4\nRYaZTRFAW95a6LnBRmTXqCWyru8Q2Llr3Zz0agtc/L1+LvF2jcltjNgsAfed0Gu3\nNiswM+SIzwKBgEH4QxvuJzMGOabow1TuPfSjU16R8lj0he/GuivzgXpI2jMEd5J3\nmeq8jnQC6rsqQ2KZ4WZNoqpy9c8jAhRKyTXJTzXLxfcrNVTwWD8c+rEmtdI9Sbpw\natEgnuPHOItbsOOR2XjVBtXFBt55CBOWahL0uKwnAV2mE6PVqusdNra1AoGARbJI\n5xVoXt1b2dS/NS310lmkX+g8c4W8IR+UlxFlbguSiHRZABtWqWdXCIL+uVyCbcxO\n1Z8oxEGDSoGd2wOSeC88HpufMj+32qiqFkIX1dyokYb+VCRJlTAXN8coxEg5lhh4\nAUVdfAuQamev8s027YycyYwIW+eaz36o52Q6b6UCgYAUs79KmYnzSWBI4NGueCGB\n6isZWyB/CXm7FO19YNLeUZSaeCtV6MpE3bnuu/lD0RTZeh3kO9iCU/hSBe2NLywt\nR5sECyYkR5WA4on/XUk5dlPu1XGtrdH9EBg6idDTdbSoE5r1PAQ3uztYAVecztOW\nEovCHd0/5Gw1Cw5aanfUqw==\n-----END PRIVATE KEY-----\n',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    }),
    ROWOFFSET: 1,

};

const assembleResponse = async (status, message) => {

    let object = {
        statusCode: status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: message
    }
    return object;
};

const createNewSheet = async (doc, tabName) => {

    try {
        let activeSheet = await doc.addSheet({ title: tabName });
        await activeSheet.loadCells('A1:D');

        const A2 = activeSheet.getCellByA1('A1');
        const B2 = activeSheet.getCellByA1('B1');
        const C2 = activeSheet.getCellByA1('C1');
        const D2 = activeSheet.getCellByA1('D1');

        A2.value = 'Index';
        A2.textFormat = { bold: true }; 

        B2.value = 'Timeframe';
        B2.textFormat = { bold: true }; //B1.textFormat = { bold: true, foregroundColor: 'red' };

        C2.value = 'Message (GPT)'; 
        C2.textFormat = { bold: true };

        D2.value = 'Message (CLAUDE)'; 
        D2.textFormat = { bold: true };

        await activeSheet.saveUpdatedCells();

    } catch (error) {
        console.error("Error creating tab:", error);
        // Handle the error appropriately
    }
}

const getCurrentDate = (yearonly) => {
    var today = new Date();

    var dd = String(today.getUTCDate()).padStart(2, '0');
    var mm = String(today.getUTCMonth() + 1).padStart(2, '0'); // Enero es 0
    var yyyy = today.getUTCFullYear();
    var hours = String(today.getUTCHours()).padStart(2, '0');
    var minutes = String(today.getUTCMinutes()).padStart(2, '0');
    var seconds = String(today.getUTCSeconds()).padStart(2, '0');

    return (yearonly) ? `${mm}/${dd}/${yyyy}` : `${mm}/${dd}/${yyyy} ${hours}:${minutes}:${seconds}`;
};

const writeToSheet = async (activeSheet, messageArray, index, aiType) => {

    console.log(`Starting the Dump job (${aiType})`);

    try {

        await activeSheet.loadCells('A1:D');
                
        let cell;

        cell = activeSheet.getCellByA1(`A${index}`); //A Column
            // if (index === 2) { cell.formula = `=0`; } else { cell.formula = `=A${index-1}+1`; }
            cell.formula = (index === 2) ? `=0` : `=A${index-1}+1`;

        cell = activeSheet.getCellByA1(`B${index}`); //B Column
            cell.value = messageArray[0];

        if (aiType === 'GPT') {
            cell = activeSheet.getCellByA1(`C${index}`); //C Column
            cell.value = messageArray[1];
        }
        
        if (aiType === 'CLAUDE') {
            cell = activeSheet.getCellByA1(`D${index}`); //C Column
            cell.value = messageArray[1];
        }

        await activeSheet.saveUpdatedCells();

    } catch (error) {
        console.error(`ERROR: ${error.toString()}`);
    }

};

export const handler = async (event, context) => {

    console.log('*********** LOADING V1.3 ***********')
    console.log(JSON.stringify(event,null,2));
    console.log(`Type: ${typeof event}`);
    console.log('*************************************')

    let eventBody = JSON.parse(event.body);

        if (event.requestContext.http.method !== 'POST') {
            let res = {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: "Method is not allowed."
            }
            console.log(JSON.stringify(res, null, 2))
            return res;
        }

    let response;
    let tabName = (!eventBody.tab) ? getCurrentDate(true) : eventBody.tab; //get the the DD/MM/YYYY

        if (!eventBody.sheetid) {

            response = await assembleResponse(400,{ message: '"sheetid" is missing from the Parameters.'}); //if it's not a GET 
            console.log(JSON.stringify(response),null,2);
            return response;

        } 

    let sheetid = eventBody.sheetid;

        if (!eventBody.message) {

            response = await assembleResponse(400,{ message: '"message" is missing from the Parameters.'}); //if it's not a GET 
            console.log(JSON.stringify(response),null,2);
            return response;

        } 

    let message = eventBody.message;

        if (!eventBody.type) {

            response = await assembleResponse(400,{ message: '"aiType" is missing from the Parameters.'}); //if it's not a GET 
            console.log(JSON.stringify(response),null,2);
            return response;

        } 

    let aiType = eventBody.type;



    let timeframe = getCurrentDate(false) // get the full timeframe, not only the DD/MM/YYYY

    const doc = new GoogleSpreadsheet(sheetid, globals.SERVICEACCOUNTAUTH);
    await doc.loadInfo();
    console.log(`Title of the doc: ${doc.title}`);

    let activeSheet = doc.sheetsByTitle[tabName];
    let recentlyCreated = false;

    if (!activeSheet){
        await createNewSheet(doc, tabName);
        console.log('Sheet created')
        recentlyCreated = true; //this means that the new sheet was recently created
        activeSheet = doc.sheetsByTitle[tabName];
    }

    // Get the next row to write
    let rowIndex;
    if (recentlyCreated) {
        rowIndex =2;
    } else {
        //await activeSheet.loadCells('B2:B');
        rowIndex = (await activeSheet.getRows()).length + globals.ROWOFFSET + 1;
    }

    //Calculate Message Array
    let messageArray = [timeframe, message]

    //Write the log to sheet
    await writeToSheet(activeSheet, messageArray, rowIndex, aiType);
    
    let res = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: `Message written in row ${rowIndex}`
    }
    
    console.log(JSON.stringify(res, null, 2))
    return res;

};

// (async () => {
//     ////console.log(JSON.stringify(
//         await handler({
//                         version: '2.0',
//                         routeKey: '$default',
//                         rawPath: '/',
//                         rawQueryString: '',
//                         headers: {
//                         'content-length': '107',
//                         'x-amzn-tls-version': 'TLSv1.2',
//                         'x-forwarded-proto': 'https',
//                         'postman-token': 'cd2f5956-44b3-4298-88e9-d10dfba4bc74',
//                         'x-forwarded-port': '443',
//                         'x-forwarded-for': '181.43.127.230',
//                         accept: '*/*',
//                         'x-amzn-tls-cipher-suite': 'ECDHE-RSA-AES128-GCM-SHA256',
//                         'x-amzn-trace-id': 'Root=1-65a09bf8-79d301b26d42233e44bb8237',
//                         host: 'ytzivrzj76ejwc2vdbnzwladdm0nvubi.lambda-url.us-east-1.on.aws',
//                         'content-type': 'application/json',
//                         'accept-encoding': 'gzip, deflate, br',
//                         'user-agent': 'PostmanRuntime/7.36.0'
//                         },
//                         requestContext: {
//                         accountId: 'anonymous',
//                         apiId: 'ytzivrzj76ejwc2vdbnzwladdm0nvubi',
//                         domainName: 'ytzivrzj76ejwc2vdbnzwladdm0nvubi.lambda-url.us-east-1.on.aws',
//                         domainPrefix: 'ytzivrzj76ejwc2vdbnzwladdm0nvubi',
//                         http: {
//                             method: 'POST',
//                             path: '/',
//                             protocol: 'HTTP/1.1',
//                             sourceIp: '181.43.127.230',
//                             userAgent: 'PostmanRuntime/7.36.0'
//                         },
//                         requestId: '9c8c29ec-37aa-4d1e-bc32-fcd3abf82fdf',
//                         routeKey: '$default',
//                         stage: '$default',
//                         time: '12/Jan/2024:01:55:04 +0000',
//                         timeEpoch: 1705024504027
//                         },
//                         body: '{\r\n' +
//                         '    "sheetid": "1Ld7Mfjf05_TGwldZP_ULT7tH050wMVZtvETNUHddT6s",\r\n' +
//                         '    "message": "This is another test"\r\n' +
//                         '}',
//                         isBase64Encoded: false
//                         })
// })() 




// {
//     "sheetid": "1Ld7Mfjf05_TGwldZP_ULT7tH050wMVZtvETNUHddT6s",
//     "tab": "01/11/2024",
//     "message": "This is a test"
// }

//https://ytzivrzj76ejwc2vdbnzwladdm0nvubi.lambda-url.us-east-1.on.aws/



