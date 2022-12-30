import { ajax } from 'rxjs/ajax'
import fs from 'fs'
import { map, catchError, of, concatMap } from 'rxjs'
import * as dotenv from 'dotenv'
dotenv.config()

const URL = `${process.env.BASE_URL}patients?page=2`
// const URL = `https://www.azucdent.net/api/patients?page=1`

import xhr2 from 'xhr2'
global.XMLHttpRequest = xhr2

const ids$ = ajax.getJSON(URL).pipe(
    concatMap((userResponse) => userResponse['data']),
    map((user) => user.id),
    catchError((error) => {
        console.log('error: ', error)
        return of(error)
    })
)

ids$.subscribe((result) => {
    try {
        const writeStream = fs.createWriteStream('test.ndjson', { flags: 'a' })
        writeStream.write(`${JSON.stringify(result)} \r\n`)
    } catch (error) {
        console.log(error)
    }
})
