// translation of a date
export function getDateTranslated(date) {

    const DayDiff =  ((new Date(Date.now()).getTime() - new Date(date).getTime()) / 86400000)

    switch (true) {

      // recent
      case (DayDiff <= 1): {
        const minDiff = Math.abs((new Date(date).getTime() - new Date().getTime()) / 60000)
        // few secondes
        if (minDiff <= 1) return 'DATE.few-sec'
        // minutes ago
        if ((minDiff > 1) && (minDiff <= 50) ) {
          // return 'DATE.x-min-ago', { value: Math.round(minDiff) }
          return null
        }
        // hours ago
        if (minDiff > 50) {
          const hoursDiff = Math.abs((new Date(date).getTime() - new Date().getTime())/ 3600000)
          // return 'DATE.x-hours-ago', { value: Math.round(hoursDiff) }
          return null
        }
      }

      // days ago
      case (DayDiff > 1 && DayDiff < 7): {
        // return 'DATE.x-days-ago', { value: Math.round(DayDiff) }
        return null
      }

      // week ago
      case (DayDiff >= 7 && DayDiff < 30): {
        if (DayDiff) return 'DATE.a-week-ago'
        else {
          const countWeek = Math.round(DayDiff / 7)
          // return 'DATE.x-week-ago', { value: countWeek }
          return null
        }
      }

      // month ago
      case (DayDiff >= 30 && DayDiff < 360): {
        const countMonth = Math.round(DayDiff / 30)
        if (countMonth <= 1) return 'DATE.a-month-ago'
        // else return ('DATE.x-month-ago', { value: Math.round(countMonth) })
        else return null
      }

      // years ago
      case (DayDiff >= 360): {
        if (DayDiff < 720) return 'DATE.a-years-ago'
        // else return ('DATE.x-years-ago', { value: Math.round(DayDiff) })
        else return null
      }

    }
}
