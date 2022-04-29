import moment from 'moment'

const ID_LOCAL_FORMAT = 'DD-MM-YYYY'
const DB_FORMAT = "YYYY-MM-DD"

class DateTimeUtils {
    static getDateFromLocalFormat(strDate: string): Date {
        return moment(strDate, ID_LOCAL_FORMAT).toDate()
    }

    static toDBFormat(date: Date | number): Date {
        return new Date(moment(date).format(DB_FORMAT))
    }
}

export default DateTimeUtils