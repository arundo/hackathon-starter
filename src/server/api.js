import express from 'express';
import fs from 'fs';
import { eachDay } from 'date-fns';
import { data } from './data';
import('csv-express');

const app = express();

const getKeyFromDate = date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();

const parseTime = timeStr => {
  return Number(timeStr.split(' ')[1].split(':')[0]);
};

const aggregate = data => {
  const sum = data.reduce(
    (acc, item) => ({
      current_temp: acc.current_temp + item.current_temp,
      target_temp: acc.target_temp + item.target_temp,
      outside_temp: acc.outside_temp + item.outside_temp
    }),
    {
      current_temp: 0,
      target_temp: 0,
      outside_temp: 0
    }
  );

  return {
    time: parseTime(data[0].time),
    current_temp: sum.current_temp / data.length,
    target_temp: sum.target_temp / data.length,
    outside_temp: sum.outside_temp / data.length
  };
};

app.get('/daily', (req, res) => {
  const { date, interval, csv } = req.query;

  let timeInterval = Number(interval);

  let dateISO;
  try {
    dateISO = getKeyFromDate(new Date(date));
  } catch (err) {
    console.log({ err });
  }

  const dailyData = data[dateISO];

  if (!dateISO) {
    res.status(400).json({ error: 'Invalid date format' });
  } else if (!dailyData) {
    res.status(400).json({ error: 'No data found for provided date' });
  } else {
    const groupData = dailyData.reduce(
      (acc, data) => {
        if (parseTime(data.time) < timeInterval) {
          acc[acc.length - 1].push(data);
        } else {
          acc.push([data]);
          timeInterval = timeInterval + Number(interval);
        }
        return acc;
      },
      [[]]
    );

    const aggData = groupData.map(data => aggregate(data));
    if (csv) {
      res.csv(aggData);
    } else {
      res.json(aggData).status(200);
    }
  }
});

app.get('/thermostat', async (req, res) => {
  if (!req.query.startDate || !req.query.endDate) {
    return res
      .send(
        `One or more required query parameter(s) could not be found. Please include both startDate and endDate.`
      )
      .status(400);
  }

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  const keys = eachDay(startDate, endDate).map(getKeyFromDate);
  const response = keys.reduce((acc, curr) => {
    return [...acc, ...data[curr]];
  }, []);

  if (!response) {
    return res.send(`No data found for provided date`).status(404);
  }

  res.json(response).status(200);
});

app.get('*', (req, res) => {
  res.send(`Invalid request.`).status(400);
});

export default app;
