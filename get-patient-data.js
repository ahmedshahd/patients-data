const rp = require('request-promise')
const fs = require('fs')
let URL = 'https://www.azucdent.net/api/patient/'
const arr = [
    15927, 15926, 15925, 15924, 15923, 15922, 15921, 15920, 15919, 15918, 15917,
    15916, 15915, 15914, 15913, 15912, 15911, 15910, 15909, 15908, 15907, 15906,
    15905, 15904, 15903, 15902, 15901, 15900, 15899, 15898, 15897, 15896, 15895,
    15894, 15893, 15892, 15891, 15890, 15889, 15888, 15887, 15886, 15885, 15884,
    15883, 15882, 15881, 15880,
]
user_list = []
const patientsId = arr.map((id) => {
    return {
        id,
    }
})
console.log(patientsId)
function make_api_call(id) {
    return rp({
        url: `${URL}${id}`,
        headers: {
            authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmF6dWNkZW50Lm5ldFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY2OTk3NTg5OCwibmJmIjoxNjY5OTc1ODk4LCJqdGkiOiJLTzlJSEZGWmV3b2VydFRIIiwic3ViIjo0ODYsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.dUvDSNqPwGaKgAzvVjruJeQaGE3odu_3SFTO1T9XKuI',
        },
        method: 'GET',
        json: true,
    })
}

async function processUsers() {
    let result
    for (let i = 0; i < patientsId.length; i++) {
        // console.log(patientsId[i].id);
        result = await make_api_call(patientsId[i].id)
        user_list[i] = result
    }
    return user_list
}
async function doTask() {
    let result = await processUsers()
    console.log(result)
    fs.writeFileSync(
        'patient-data-first-page.json',
        JSON.stringify(result),
        function (err) {
            if (err) {
                console.error(err)
            }
        }
    )
}
doTask()
