import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  AreaSeries
} from 'react-vis'
import { async } from 'rxjs/internal/scheduler/async';

const Dashboard = () => {
  const [data, setData] = useState([])
  const [date, setDate] = useState('2016/10/02')
  const [intv, setintv] = useState('2')
  const [dateText, setDateText] = useState('')
  const [intvText, setIntvText] = useState('')

  useEffect(() => {
    const getData = async() => {
      const res = await axios.get(`http://localhost:3000/api/daily?date=${date}&interval=${intv}`)
      setData(res.data)
    }
    getData()
  }, [])

  const getData = async () => {
    const res = await axios.get(`http://localhost:3000/api/daily?date=${dateText}&interval=${intvText}`)
    console.log({res})
    setData(res.data)
  }

  if (data.length === 0) return <div>Loading</div>

  return (
    <div>
      <XYPlot width={300} height={300}>
        <AreaSeries data={data.map(item => ({x: item.time, y: item.outside_temp}))} opacity={0.25} />
        <HorizontalGridLines />
        <AreaSeries data={data.map(item => ({x: item.time, y: item.current_temp}))} opacity={0.25} />
        <AreaSeries data={data.map(item => ({x: item.time, y: item.target_temp}))} opacity={0.25} />
        <XAxis />
        <YAxis />
      </XYPlot>
      <input
        value={dateText}
        onChange={e => setDateText(e.target.value)}
      />
      <input
        value={intvText}
        onChange={e => setIntvText(e.target.value)}
      />
      <button onClick={getData}>Change</button>
    </div>
  )
}

export default Dashboard
