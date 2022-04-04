const mongoose = require('mongoose')

const Pet = require('./pet.js')

// https://mongoosejs.com/docs/
async function main() {
    await mongoose.connect("mongodb+srv://Celine:Plox1995@cluster0.gv7zr.mongodb.net/pet-adoption");

    // read PetDataSet.json - https://stackabuse.com/reading-and-writing-json-files-with-node-js/
    const fs = require('fs');

    let rawdata = fs.readFileSync('PetDataSet.json');
    let petData = JSON.parse(rawdata);


    // iterate over the JSON one by one:
    for (let i = 0; i < petData.length; i++) {
        const animals = new Pet(petData[i]);
        console.log(petData[i].name)
        await animals.save();
    }
    // for each item, create a new mongo document from the data
    // and then save it 
}

main().then(() => {
    console.log("Done");
});

