import I18n from '../../i18n/i18n'

// translation of a date
export function getDateTranslated(date) {

    const DayDiff =  ((new Date(Date.now()).getTime() - new Date(date).getTime()) / 86400000)

    switch (true) {

      // recent
      case (DayDiff <= 1): {
        const minDiff = Math.abs((new Date(date).getTime() - new Date().getTime()) / 60000)
        // few secondes
        if (minDiff <= 1) return I18n.t('DATE.few-sec')
        // minutes ago
        if ((minDiff > 1) && (minDiff <= 50) ) {
          return I18n.t('DATE.x-min-ago', { value: Math.round(minDiff) })
        }
        // hours ago
        if (minDiff > 50) {
          const hoursDiff = Math.abs((new Date(date).getTime() - new Date().getTime())/ 3600000)
          return I18n.t('DATE.x-hours-ago', { value: Math.round(hoursDiff) })
        }
      }

      // days ago
      case (DayDiff > 1 && DayDiff < 7): {
        return I18n.t('DATE.x-days-ago', { value: Math.round(DayDiff) })
      }

      // week ago
      case (DayDiff >= 7 && DayDiff < 30): {
        if (DayDiff) return I18n.t('DATE.a-week-ago')
        else {
          const countWeek = Math.round(DayDiff / 7)
          return I18n.t('DATE.x-week-ago', { value: countWeek })
        }
      }

      // month ago
      case (DayDiff >= 30 && DayDiff < 360): {
        const countMonth = Math.round(DayDiff / 30)
        if (countMonth <= 1) return I18n.t('DATE.a-month-ago')
        else return I18n.t('DATE.x-month-ago', { value: Math.round(countMonth) })
      }

      // years ago
      case (DayDiff >= 360): {
        if (DayDiff < 720) return I18n.t('DATE.a-years-ago')
        else return I18n.t('DATE.x-years-ago', { value: Math.round(DayDiff) })
      }

    }
}
