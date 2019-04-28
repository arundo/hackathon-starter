import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  AreaSeries,
  LineSeries,
  DiscreteColorLegendItem
} from 'react-vis'
// import { async } from 'rxjs/internal/scheduler/async';

const Dashboard = () => {
  const [data, setData] = useState([])
  const [dateText, setDateText] = useState('')
  const [intvText, setIntvText] = useState('')
  const [date, setDate] = useState('2018-11-01')
  const [intv, setIntv] = useState(2)

  const refDate = React.createRef

  useEffect(() => {
    date
    getData()
  }, [date])

  const getData = async () => {
    try{
      const res = await axios.get(`http://localhost:3000/api/daily?date=${moment(date).format('YYYY/MM/DD')}&interval=${intv}`)
      setData(res.data)
    } catch (err) {
      setData([])
    }
  }

  return (
    <div>
      {
        data.length === 0 && <div style={{width: 1000, height: 400}}> No Data </div>
      }
      {
        data.length !== 0 &&
        <XYPlot width={1000} height={400}>
          <LineSeries data={data.map(item => (
            { x: item.time, y: item.outside_temp }))}
            opacity={0.25}
            color="#DB463B"
          />
          <HorizontalGridLines />
          <LineSeries data={data.map(item => (
            { x: item.time, y: item.current_temp }))}
            opacity={0.25}
            color="#DA3F6D"
          />
          <LineSeries data={data.map(item => (
            { x: item.time, y: item.target_temp }))}
            opacity={0.25}
            color="#7548C9"
          />
          <XAxis />
          <YAxis />
        </XYPlot>
      }
      <button onClick={() => { setDate(moment(date).add(-7, 'days').format('YYYY-MM-DD')) }} >
        {'<<'}
      </button>
      <button onClick={() => { setDate(moment(date).add(-1, 'days').format('YYYY-MM-DD')) }} >
        {'<'}
      </button>
      <input
        type="date"
        value={date}
        onChange={e => {
          setDate(e.target.value)
          getData()
        }}
      />
      <button onClick={() => { setDate(moment(date).add(1, 'days').format('YYYY-MM-DD')) }} >
        >
      </button>
      <button onClick={() => { setDate(moment(date).add(7, 'days').format('YYYY-MM-DD')) }} >
        >>
      </button>
    </div>
  )
}

export default Dashboard
