/**
 * Created by alice on 22.07.17.
 */
const initialState = {
    marks: [
        {
            first_name:"Иван",
            last_name:"Петров",
            date:"12.12.2012",
            value:"4"
        },
        {
            first_name:"Иван",
            last_name:"Сидоров",
            date:"12.12.2012",
            value:"3"
        },
        {
            first_name:"Иван",
            last_name:"Иванов",
            date:"12.12.2012",
            value:"5"
        }
    ]
}

export default function user(state = initialState) {
    return state
}
