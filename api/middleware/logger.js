require('dotenv').config();
const fs = require('fs');
const chalk = require('chalk')

const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

module.exports = function logger(req, res, next) {
  const currentDatetime = new Date();
  // eslint-disable-next-line operator-linebreak
  const formattedDate =
    `${currentDatetime.getFullYear()
    }-${currentDatetime.getMonth() + 1
    }-${currentDatetime.getDate()
    } ${currentDatetime.getHours()
    }:${currentDatetime.getMinutes()
    }:${currentDatetime.getSeconds()}`;
  const { method } = req;
  const { url } = req;
  const status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const log = `[${formattedDate}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  console.log(`[${chalk.blue(formattedDate)}] ${method}:${url} ${status} ${chalk.red(`${durationInMilliseconds.toLocaleString()}ms`)}`)

  // don't save logs in development environment
  if (process.env.ENVIRONMENT !== 'DEVELOPMENT') {
    fs.appendFile('./logs/request_logs.txt', `${log}\n`, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }
  next();
};
