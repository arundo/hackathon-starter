import express from 'express'
import fs from 'fs'
import { eachDay } from 'date-fns'
import data from './data'
import ('csv-express')


const app = express()

const getKeyFromDate = date => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate()
).toISOString()

app.get('/daily', async (req, res) => {
  const { date, interval, csv } = req.query

  const startDate = new Date(date)
  const endDate = new Date(date)

  const keys = eachDay(startDate, endDate).map(getKeyFromDate)
  const response = keys.reduce((acc, curr) => {
    return [...acc, ...data[curr]]
  }, [])

  let time = Number(interval)

  const parseTime = timeStr => {
    return Number(timeStr.split(' ')[1].split(':')[0])
  }

  const aggregate = data => {
    const sum = data.reduce((acc, item) => ({
      current_temp: acc.current_temp + item.current_temp,
      target_temp: acc.target_temp + item.target_temp,
      outside_temp: acc.outside_temp + item.outside_temp
    }), {
        current_temp: 0,
        target_temp: 0,
        outside_temp: 0,
    })

    return ({
      time: parseTime(data[0].time),
      current_temp: sum.current_temp/data.length,
      target_temp: sum.target_temp/data.length,
      outside_temp: sum.outside_temp/data.length,
    })
  }
  const groupData = response.reduce((acc, res) => {
    if (parseTime(res.time) < time) {
      acc[acc.length-1].push(res)
    } else {
      acc.push([res])
      time = time + Number(interval)
    }
    return acc
  }, [[]])
  
  const aggData = groupData.map(data => aggregate(data))

  if (!aggData) {
    return res.send(`No data found for provided date`).status(404)
  }

  if (csv) {
    res.csv(aggData)
  } else {
    res.json(aggData).status(200)
  }
})

app.get('/thermostat', async (req, res) => {
  if (!req.query.startDate || !req.query.endDate) {
    return res.send(`One or more required query parameter(s) could not be found. Please include both startDate and endDate.`).status(400)
  }

  const startDate = new Date(req.query.startDate)
  const endDate = new Date(req.query.endDate)

  const keys = eachDay(startDate, endDate).map(getKeyFromDate)
  const response = keys.reduce((acc, curr) => {
    return [...acc, ...data[curr]]
  }, [])

  if (!response) {
    return res.send(`No data found for provided date`).status(404)
  }

  res.json(response).status(200)
})

app.get('*', (req, res) => {
  res.send(`Invalid request.`).status(400)
})

export default app
