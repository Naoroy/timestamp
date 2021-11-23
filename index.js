const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.get('/', (req, res) => { res.send('Hello there\n') })
app.get('/api', currentDate)
app.get('/api/:date?', dateParse)

function currentDate(req, res) {
	res.send(getDate())
}

function dateParse(req, res) {
	let params = req.params.date

	if (Number(params) == params) {
		res.send(getDate(Number(params)))
	}
	else if (new Date(params).toString() != 'Invalid Date') {
		res.send(getDate(params))
	}
	else {
		res.send({ error: 'Invalid Date' })
	}
}

function getDate(param) {
	let date = param ? new Date(param) : new Date()

	return {
		unix: date.getTime(),
		utc: date.toUTCString()
	}
}

app.listen(PORT, () => { console.log('Listening on ' + PORT) })
