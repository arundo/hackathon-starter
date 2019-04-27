import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis'

const Dashboard = () => (
  <div>
    <div>Something Here</div>
    <XYPlot
      width={300}
      height={300}>
      <HorizontalGridLines />
      <LineSeries
        data={[
          {x: 1, y: 10},
          {x: 2, y: 5},
          {x: 3, y: 15}
        ]}/>
      <XAxis />
      <YAxis />
    </XYPlot>
  </div>
)

export default Dashboard