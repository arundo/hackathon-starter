import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import styled from 'styled-components'
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  AreaSeries,
  LineSeries,
  DiscreteColorLegend
} from 'react-vis'

import {
  TitleBoard,
  TitleContainer,
  GraphContainer,
  DashboardContainer
} from './Styled.jsx'

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
    <DashboardContainer>
      <TitleContainer>
        <TitleBoard>
          <h3>Daily Temperature From an Indoor Thermostat</h3>
          <div>
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
        </TitleBoard>
        <div>
          <DiscreteColorLegend
            items={[
                {title: 'current temp', color: '#0182C8', strokeWidth:'3px'},
                {title: 'target temp', color: '#6C8893', strokeWidth:'3px'},
                {title: 'outside temp', color: 'pink', strokeWidth:'3px'},
              ]}
            orientation="horizontal"
          />
        </div>
      </TitleContainer>
      {
        data.length === 0 &&
        <GraphContainer>
          <p>Data Not Available</p>
          <p>Please Pick A Date Between: 11/01/2018 - 03/06/2019</p>
        </GraphContainer>
      }
      {
        data.length !== 0 &&
        <GraphContainer>
          <FlexibleXYPlot yDomain={[30,100]}>
            <HorizontalGridLines />
            <XAxis
              attr="x"
              attrAxis="y"
              orientation="bottom"
              tickFormat={function tickFormat(d){return `${d}:00`}}
              title="local time"
            />
            <YAxis
              attr="y"
              attrAxis="x"
              orientation="left"
              title="°F"
            />
            <LineSeries data={data.map(item => (
              { x: item.time, y: item.outside_temp }))}
              opacity={.75}
              color="pink"
              strokeStyle="solid"
              style={{}}
              curve="curveBasis"
              strokeWidth="3px"
            />
            <LineSeries data={data.map(item => (
              { x: item.time, y: item.current_temp }))}
              opacity={.75}
              color="#0182C8"
              strokeStyle="solid"
              style={{}}
              curve="curveBasis"
              strokeWidth="3px"
            />
            <LineSeries data={data.map(item => (
              { x: item.time, y: item.target_temp }))}
              opacity={.75}
              color="#6C8893"
              strokeStyle="solid"
              style={{}}
              curve="curveBasis"
              strokeWidth="3px"
            />
          </FlexibleXYPlot>
        </GraphContainer>
      }
    </DashboardContainer>
  )
}

export default Dashboard
