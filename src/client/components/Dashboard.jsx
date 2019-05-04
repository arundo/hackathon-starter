import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  DiscreteColorLegend,
  MarkSeries
} from 'react-vis';

import { TitleBoard, TitleContainer, GraphContainer, DashboardContainer } from './Styled.jsx';

const StyledTitleBoard = styled(TitleBoard)`
  button {
    transition: all 0.4s ease-out;

    &:not(:last-child) {
      margin-right: 0.4rem;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  input {
    margin-right: 0.4rem;

    div {
      color: red;
    }

    span {
      color: red;
    }
  }
`;

const StyledColorLegend = styled(DiscreteColorLegend)`
  span {
    margin-top: 20px;
  }
`;

const Dashboard = ({ socket }) => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('2018-11-01');
  const [intv, setIntv] = useState(1);
  const [cTempLine, setCTempLine] = useState(null);
  const [tTempLine, setTTempLine] = useState(null);
  const [oTempLine, setOTempLine] = useState(null);
  const [streamObj, setStreamObj] = useState({});
  const [live, setLive] = useState(false);

  useEffect(() => {
    socket && socket.on('stream_in', obj => setStreamObj(obj));
  }, [socket]);

  useEffect(() => {
    socket && live && socket.emit('stream');
    socket && !live && socket.emit('end_stream');
  }, [live]);

  useEffect(() => {
    date;
    getData();
  }, [date]);

  useEffect(() => {
    console.log(streamObj);
  }, [streamObj]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${
          process.env.MODE
            ? 'https://mysterious-garden-30716.herokuapp.com'
            : 'http://localhost:3000'
        }/api/daily?date=${moment(date).format('YYYY/MM/DD')}&interval=${intv}`
      );
      setData(res.data);
    } catch (err) {
      setData([]);
    }
  };

  return (
    <DashboardContainer>
      <TitleContainer>
        <StyledTitleBoard>
          <h3>
            Daily Temperature From an Indoor Thermostat
            <span onClick={() => setLive(!live)}>Live Demo</span>
            <em>{live && streamObj.outside_temp}</em>
          </h3>
          <div>
            <button
              onClick={() => {
                setDate(
                  moment(date)
                    .add(-7, 'days')
                    .format('YYYY-MM-DD')
                );
              }}
            >
              {'<<'}
            </button>
            <button
              onClick={() => {
                setDate(
                  moment(date)
                    .add(-1, 'days')
                    .format('YYYY-MM-DD')
                );
              }}
            >
              {'<'}
            </button>
            <input
              type='date'
              value={date}
              onChange={e => {
                setDate(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setDate(
                  moment(date)
                    .add(1, 'days')
                    .format('YYYY-MM-DD')
                );
              }}
            >
              >
            </button>
            <button
              onClick={() => {
                setDate(
                  moment(date)
                    .add(7, 'days')
                    .format('YYYY-MM-DD')
                );
              }}
            >
              >>
            </button>
          </div>
        </StyledTitleBoard>
        <div>
          <StyledColorLegend
            items={[
              { title: 'current temp', color: '#0182C8', strokeWidth: 15 },
              { title: 'target temp', color: '#6C8893', strokeWidth: 15 },
              { title: 'outside temp', color: '#f44336', strokeWidth: 15 }
            ]}
            orientation='horizontal'
          />
        </div>
      </TitleContainer>
      {data.length === 0 && (
        <GraphContainer>
          <p>Data Not Available</p>
          <p>Please Pick A Date Between: 11/01/2018 - 03/06/2019</p>
        </GraphContainer>
      )}
      {data.length !== 0 && (
        <GraphContainer>
          <FlexibleXYPlot
            yDomain={[30, 100]}
            onMouseLeave={() => {
              setCTempLine(null);
              setOTempLine(null);
              setTTempLine(null);
            }}
          >
            <HorizontalGridLines />
            <XAxis
              attr='x'
              attrAxis='y'
              orientation='bottom'
              tickFormat={function tickFormat(d) {
                return `${d}:00`;
              }}
              title='local time'
            />
            <YAxis attr='y' attrAxis='x' orientation='left' title='°F' />
            <LineSeries
              data={data.map(item => ({ x: item.time, y: item.outside_temp }))}
              opacity={0.75}
              color='#f44336'
              strokeStyle='solid'
              style={{}}
              curve='curveBasis'
              strokeWidth={3}
              onNearestX={value => setOTempLine(value)}
            />
            {oTempLine && (
              <LineSeries
                data={[
                  { x: oTempLine && oTempLine.x, y: 30 },
                  { x: oTempLine && oTempLine.x, y: 100 }
                ]}
                stroke='lightgray'
                strokeStyle='dashed'
                strokeWidth={1}
              />
            )}
            {oTempLine && (
              <MarkSeries
                data={[
                  {
                    x: oTempLine && oTempLine.x,
                    y: oTempLine && oTempLine.y
                  }
                ]}
                color='#d32f2f'
              />
            )}
            <LineSeries
              data={data.map(item => ({ x: item.time, y: item.current_temp }))}
              opacity={0.75}
              color='#0182C8'
              strokeStyle='solid'
              style={{}}
              curve='curveBasis'
              strokeWidth={3}
              onNearestX={value => setCTempLine(value)}
            />
            {cTempLine && (
              <MarkSeries
                data={[
                  {
                    x: cTempLine && cTempLine.x,
                    y: cTempLine && cTempLine.y
                  }
                ]}
                color='#0b699c'
              />
            )}
            <LineSeries
              data={data.map(item => ({ x: item.time, y: item.target_temp }))}
              opacity={0.75}
              color='#6C8893'
              strokeStyle='solid'
              style={{}}
              curve='curveBasis'
              strokeWidth={3}
              onNearestX={value => setTTempLine(value)}
            />
            {tTempLine && (
              <MarkSeries
                data={[
                  {
                    x: tTempLine && tTempLine.x,
                    y: tTempLine && tTempLine.y
                  }
                ]}
                color='#41535a'
              />
            )}
          </FlexibleXYPlot>
        </GraphContainer>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
