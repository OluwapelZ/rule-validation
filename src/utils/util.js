const fs = require('fs');

function generateOTP() {
    const digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP;
}

function writeToStorageFile(otp, phoneNumber, data) {
    const storageFile = fs.readFileSync('hashed_with_otp.json');
    const fileContent = JSON.parse(storageFile);

    if (!fileContent[phoneNumber]) { //If data does not already exists in the file.
        fileContent[phoneNumber] = {otp: otp, data: data};
    }

    fs.writeFile('hashed_with_otp.json', JSON.stringify(fileContent), (err) => {
        console.log('Successfully stored json');
        if (err) {
            console.log(err.stack)
            throw err;
        }
    });
}

function readFromStorageFile(otp, phoneNumber) {
    const storageFile = fs.readFileSync('hashed_with_otp.json');
    const fileContent = JSON.parse(storageFile);

    if (fileContent[phoneNumber] && (fileContent[phoneNumber].otp == otp))
        return fileContent[phoneNumber].data;

    return null
}

module.exports = { generateOTP, writeToStorageFile, readFromStorageFile };