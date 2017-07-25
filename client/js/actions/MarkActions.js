/**
 * Created by alice on 24.07.17.
 */

let photosArr = []
let cached = false

function makeYearPhotos(photos, selectedYear) {
    let createdYear, yearPhotos = []

    photos.forEach((item) => {
        createdYear = new Date(item.created*1000).getFullYear()
        if (createdYear === selectedYear ) {
            yearPhotos.push(item)
        }
    })

    yearPhotos.sort((a,b) => b.likes.count-a.likes.count);

    return yearPhotos
}

function getMorePhotos(offset, count, year, dispatch) {
    VK.Api.call('photos.getAll', {extended:1, count: count, offset: offset},(r) => { // eslint-disable-line no-undef
        try {
            if (offset <= r.response[0] - count) {
                offset+=200;
                photosArr = photosArr.concat(r.response)
                getMorePhotos(offset,count,year,dispatch)
            } else {
                let photos = makeYearPhotos(photosArr, year)
                cached = true
                dispatch({
                    type: GET_PHOTOS_SUCCESS,
                    payload: photos
                })
            }
        }
        catch(e) {
            dispatch({
                type: GET_PHOTOS_FAIL,
                error: true,
                payload: new Error(e)
            })
        }

    })
}

export function getMarks(subject) {

    return (dispatch) => {
        dispatch({
            type: 'GET_Marks_REQUEST',
            payload: subject
        })

        if (cached) {
            let marks = makeYearPhotos(photosArr, year)
            dispatch({
                type: 'GET_MARKS_SUCCESS',
                payload: marks
            })
        } else {
            getMorePhotos(0,200,year,dispatch)
        }

    }
}