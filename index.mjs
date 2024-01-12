import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fetch from 'node-fetch';

const globals = {
    SERVICEACCOUNTAUTH: new JWT({
        email:  'javascript-writer@groupsproject-370909.iam.gserviceaccount.com',
        key:    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtAUZp72L3zq+6\nGdBUrgGqs7kbUtWx0mKHfdMiliRsLe6wj0UYdhSqU/Nd505ic0EGRwrhxL3rq4FV\nIQI5creAGfNWzOZKtAPMV4YoSqN8HgfvF/DrLgGAwScn56dVituCOxv4j9pXQIIo\nMiIm9O13mWlEBEFjw+jXP/Z+6M7Rgk25lDZR0/1A/KX5eG/XJ0fmcC+TSM0NpS6V\nKrbqHweFfgLDTbUqsf8TUOqLFJ0Qaj7VBuGjd9yp9+icZ68giksMuyFdqlo4MKD6\ns2WW3YR2NeSbQ/+D+6IGWyts+9NA9OVDazaT1nJ6+KYO+Oq6c1l8lxS9ur01JrSU\nPIP1PLTjAgMBAAECggEAOG8MCw5dmDxBslEtVhIU1RwfK7yPnJvmLBBtSQD1DJzH\nGa0CewI5p34PCvii5xZ1hZizAgZtdWzSmXRVB2xWU2EjsZLRJFkoTAXY61e9kIUz\nTVjf67dsIhXfsfKs8QiEpiyl6STzsjaGvpnr7g1DURon7ln9ApAraduhirBilpCD\ne6HpFv81gRT+2ujzFvWWW4NE0E2uy8LxnOxSyFGOpK4PUWPpoJuLf52MCwOae+oB\nRXKpxjMjM9kBJ4Rex9ugR6ETwkf1JDQfa/uM/cOlEQjqS9rp20jbZCWPtYfSpLt0\n+nr+TfM+nGYYu0zWRLH6mTHVnHGItFcjUAQTIZdk0QKBgQDWYglr4IIAZh6BYe/z\nbXI+mQN9UbkTzQ691abyjY5pUEu0lKd/HrYwS0Phzj+5lhaUtrEvbN0HclaTCEd7\n10v0m30jiwJPQDmu9RXj6Tl3qKb2rxnHLviX9ypJ7mkDHO7KTRDahVvm6jZmcHnR\nzNA/9mYLpiVNpGQakoyVVX3vrQKBgQDOluu1C2j5PCuGkmkEEOSb4uZt9MvTGdDi\ns/7fcPEyPS/1Vbh/IrKwBBSnfpcUfCpD1dC8YbQhjsHewdPqnpiOHFj9hOsoQeH4\nRYaZTRFAW95a6LnBRmTXqCWyru8Q2Llr3Zz0agtc/L1+LvF2jcltjNgsAfed0Gu3\nNiswM+SIzwKBgEH4QxvuJzMGOabow1TuPfSjU16R8lj0he/GuivzgXpI2jMEd5J3\nmeq8jnQC6rsqQ2KZ4WZNoqpy9c8jAhRKyTXJTzXLxfcrNVTwWD8c+rEmtdI9Sbpw\natEgnuPHOItbsOOR2XjVBtXFBt55CBOWahL0uKwnAV2mE6PVqusdNra1AoGARbJI\n5xVoXt1b2dS/NS310lmkX+g8c4W8IR+UlxFlbguSiHRZABtWqWdXCIL+uVyCbcxO\n1Z8oxEGDSoGd2wOSeC88HpufMj+32qiqFkIX1dyokYb+VCRJlTAXN8coxEg5lhh4\nAUVdfAuQamev8s027YycyYwIW+eaz36o52Q6b6UCgYAUs79KmYnzSWBI4NGueCGB\n6isZWyB/CXm7FO19YNLeUZSaeCtV6MpE3bnuu/lD0RTZeh3kO9iCU/hSBe2NLywt\nR5sECyYkR5WA4on/XUk5dlPu1XGtrdH9EBg6idDTdbSoE5r1PAQ3uztYAVecztOW\nEovCHd0/5Gw1Cw5aanfUqw==\n-----END PRIVATE KEY-----\n',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    }),
    ROWOFFSET: 1,

};

const createNewSheet = async (doc, tabName) => {

    try {
        let activeSheet = await doc.addSheet({ title: tabName });
        await activeSheet.loadCells('A1:Z');

        const B2 = activeSheet.getCellByA1('B2');
        const C2 = activeSheet.getCellByA1('C2');

        B2.value = 'Timeframe';
        B2.textFormat = { bold: true }; //B2.textFormat = { bold: true, foregroundColor: 'red' };

        C2.value = 'Message'; 
        C2.textFormat = { bold: true };

        await activeSheet.saveUpdatedCells();
    } catch (error) {
        console.error("Error creating tab:", error);
        // Handle the error appropriately
    }
}

const getCurrentDate = (yearonly) => {

    let res;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    var yyyy = today.getFullYear();

    (yearonly) ? res = `${mm}/${dd}/${yyyy}` : res = today.toString();

    return res;
    
};

const getRowIndex = async (activeSheet) => {
    await activeSheet.loadCells('B2:B');
    let rows = await activeSheet.getRows();
    return rows.length
    // return matrix.findIndex(item => (item[1] === array[1]) && (item[2] === array[2]) && (item[3] === array[3]) && (item[4] === array[4]) && (item[5] === array[5]) );
}

const writeToSheet = async (knowledgebase_url, dataMatrix, doc, tabName, textOnly = false) => {

    let rowOffset = 3;
    console.log('Starting the Dump job');

    try {

        const activeSheet = await doc.sheetsByTitle[tabName]
        // const range = `B1:C${dataMatrix.length + 2}`;
        const range = `B1:H`;
        await activeSheet.loadCells(range);

        let cell;
        let newBody;

            for (let i = 0; i < dataMatrix.length; i++) {

                let rowIndex = i + rowOffset; 

                cell = activeSheet.getCellByA1(`B${rowIndex}`); //B Column
                cell.value = (i + 1);

                cell = activeSheet.getCellByA1(`C${rowIndex}`); //C Column
                cell.value = dataMatrix[i][0];
                
                cell = activeSheet.getCellByA1(`D${rowIndex}`); //D Column
                cell.value = `=HYPERLINK("${knowledgebase_url}hc/en-us/articles/${dataMatrix[i][0]}","${dataMatrix[i][1]}")` ;

                cell = activeSheet.getCellByA1(`E${rowIndex}`); //E Column
                textOnly ? newBody = htmlToText(dataMatrix[i][2], { wordwrap: 130 }) : newBody = dataMatrix[i][2];
                newBody = (newBody.length > 49999) ? newBody.substring(0, 49999) : newBody;
                cell.value = newBody;

                cell = activeSheet.getCellByA1(`F${rowIndex}`); //F Column
                cell.value = (!dataMatrix[i][3]) ? 'Null' : dataMatrix[i][3] ;

                // cell = activeSheet.getCellByA1(`F${rowIndex}`); //G Column
                // cell.value = `=HYPERLINK("${knowledgebase_url}hc/en-us/articles/${dataMatrix[i][0]}","${dataMatrix[i][0]}")` ;

                // console.log(`Iteration # ${i}`);
                
            }

        console.log('Dump finished');
        await activeSheet.saveUpdatedCells();

    } catch (error) {
        console.error(error.toString());
    }
};

// const updateVisibility = async (counter, allIds) => { //el comienza aqui: 14935311826578 

//     let internalCounter = 0;
//     for (const articleId of allIds) {
//         let callURL = `https://answerhub.support.ignitetech.com/api/v2/help_center/en-us/articles/${articleId}`;
//         try {
//             const response = await fetch(callURL, {
//                 headers: {
//                     'Authorization': globals.ZDAUTH,
//                     'Content-Type': 'application/json'
//                 },
//                 method: 'PUT',
//                 body: JSON.stringify({ article: { user_segment_id: 360000807280 } })
//             });

//             if (!response.ok) {
//                 console.log(callURL)
//                 throw new Error(`Error updating article ${articleId}: ${response.statusText}`);
//             }

//             console.log(`${counter}${String(internalCounter).padStart(2, '0')} - Article ${articleId} updated`);
//             internalCounter++;
//         } catch (error) {
//             console.error(error);
//         }
//     }

// };

export const handler = async (event, context) => {

    console.log('*********** LOADING ***********')
    let eventObject = JSON.parse(event.body);
    let sheetid = eventObject.sheetid;
    let tabName = (!eventObject.tabName) ? tabName = getCurrentDate(true) : eventObject.tabName; //get the the DD/MM/YYYY
    let message = eventObject.message;

    let timeframe = getCurrentDate(false) // get the full timeframe, not only the DD/MM/YYYY

    // const doc = new GoogleSpreadsheet(sheetid, globals.SERVICEACCOUNTAUTH);
    const doc = new GoogleSpreadsheet(sheetid, globals.SERVICEACCOUNTAUTH);

    await doc.loadInfo();
    console.log(`Title of the doc: ${doc.title}`);

    let activeSheet = doc.sheetsByTitle[tabName];

    if (!activeSheet){
        await createNewSheet(doc, tabName);
        console.log('Sheet created')
    }

    // get the next row to write
    const rowIndex = await getRowIndex(activeSheet) + globals.ROWOFFSET + 1;

    console.log(`Row to write: ${rowIndex}`);

    return ;

};

(async () => {
    //console.log(JSON.stringify(
        await handler({
        body: JSON.stringify({
            "sheetid": "14DLQIz0uL2mq_KHitEtyCJal4cU95mX6icIo_pxXuiE",
            "tabName": "01/11/2024",
            "message": "This is a test"
        }, null, 2)
    })
    //));
})() 

//https://answerhub.support.ignitetech.com/

//https://support.jigsawinteractive.com/
