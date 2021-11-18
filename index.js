const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const dateToUnix = require('./src/dateToUnix')

app.get('/', (req, res) => {
	res.send('Hello there\n')
})

app.get('/api/:date?', (req, res) => {
	const reqDate = req.params.date

	if (!isNaN(Number(reqDate))) {
		let date = new Date(Number(reqDate))

		return res.status(200).send({ utc: date, unix: reqDate })
	}

	let date = new Date(reqDate)
	let ISODate = date.toISOString().split('T')[0]

	if (dateIsValid(date)) {
		res.status(200).send({
			utc: date.toString(),
			unix: date.getTime()
		})
	}
})

const dateIsValid = (date) => date == ISODate

app.listen(PORT, () => { console.log('Listening on ' + PORT) })
