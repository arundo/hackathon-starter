import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  AreaSeries,
  DiscreteColorLegendItem
} from 'react-vis'
import { async } from 'rxjs/internal/scheduler/async';

const Dashboard = () => {
  const [data, setData] = useState([])
  const [date, setDate] = useState('2018/11/01')
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
    const res = await axios.get(`http://localhost:3000/api/daily?date=${dateText || date}&interval=${intvText || intv}`)
    setData(res.data)
  }

  if (data.length === 0) return <div>Loading</div>

  return (
    <div>
      <XYPlot width={1000} height={400}>
        <AreaSeries data={data.map(item => (
          { x: item.time, y: item.outside_temp }))}
          opacity={0.25}
          color="#DB463B"
        />
        <HorizontalGridLines />
        <AreaSeries data={data.map(item => (
          { x: item.time, y: item.current_temp }))}
          opacity={0.25}
          color="#DA3F6D"
        />
        <AreaSeries data={data.map(item => (
          { x: item.time, y: item.target_temp }))}
          opacity={0.25}
          color="#7548C9"
        />
        <XAxis />
        <YAxis />
      </XYPlot>
      <input
        type="date"
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
