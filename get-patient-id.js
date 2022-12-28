const rp = require('request-promise')
const fs = require('fs') 
let URL = "https://www.azucdent.net/api/patients?page=1"

function make_api_call(){
    return rp({
        url : `${URL}`,
        method : 'GET',
        json : true
    })
}

async function processUsers(){
      let result = await make_api_call();
        user_list_id = result['data'].map((user) => user.id)
    return user_list_id
}

async function doTask(){
    let result = await processUsers();
    console.log(result);
    fs.writeFileSync("first_page_patients_ids.json", JSON.stringify(result) , function(err) {
        if (err) {
            console.error(err);
        }
    });
}
doTask();