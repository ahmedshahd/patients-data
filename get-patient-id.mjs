import { ajax } from 'rxjs/ajax'
import fs from 'fs'
import { map, catchError, of, concatMap } from 'rxjs'
const URL = 'https://www.azucdent.net/api/patients?page=1'
import xhr2 from 'xhr2'
global.XMLHttpRequest = xhr2

const ids$ = ajax.getJSON(`${URL}`).pipe(
    concatMap((userResponse) => userResponse['data']),
    map((user) => user.id),
    catchError((error) => {
        console.log('error: ', error)
        return of(error)
    })
)

ids$.subscribe((result) => {
    fs.appendFileSync(
        'first_page_patients_ids.ndjson',
        `${JSON.stringify(result)} \r\n`,
        function (err) {
            if (err) {
                console.error(err)
            }
        }
    )
})
