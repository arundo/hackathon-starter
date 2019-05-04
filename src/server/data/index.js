const rawData = require('./data.json')

const numericKeys = [
  'current_temp',
  'target_temp',
  'outside_temp',
  'heater_val',
  'humidity',
  'outside',
  'outside_humidity',
  'pressure',
  'wind_speed',
  'wind_degrees',
  'precip_today',
  'auto_away',
  'local_epoch'
]

const keysToKeep = [
  'current_temp',
  'target_temp',
  'outside_temp',
  'heater_val',
  'humidity',
  'outside_humidity'
]

const chunkByDay = data =>
  data.reduce((acc, curr) => {
    const time = new Date(curr.time)
    const date = new Date(time.getFullYear(), time.getMonth(), time.getDate())
    const key = date.toISOString()
    // const record = transformRecord(curr)
    if (!acc[key]) {
      acc[key] = [curr]
    } else {
      acc[key] = [...acc[key], curr]
    }
    return acc
  }, {})

const transformRecord = record => {
  record['outside_humidity'] = record.outside_humiity.replace('%', '')
  const newRecord = { time: record.time }
  Object.keys(record).forEach(key => {
    if (keysToKeep.includes(key)) {
      if (numericKeys.includes(key)) {
        newRecord[key] = Number(record[key])
      } else if (key === 'heater_state') {
        newRecord[key] = record[key] === 'TRUE'
      } else {
        newRecord[key] = record[key]
      }
    }
  })
  return newRecord
}

// const transformRecord = record => {
//   Object.keys(record).forEach(key => {
//     if (numericKeys.includes(key) && record[key]) {
//       record[key] = Number(record[key])
//     }
//     if (key === 'heater_state') {
//       record[key] = record[key] === 'TRUE'
//     }
//   })
//   return record
// }

const filteredData = rawData.filter(record => {
  return parseInt(record.local_epoch) > 1541045844
})
const cleanedData = filteredData.map(transformRecord)

module.exports = {
  data: chunkByDay(cleanedData),
  transformRecord
}
