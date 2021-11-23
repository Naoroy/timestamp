const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
	res.send('Hello there\n')
})

app.get('/api/:date?', dateHandler)

function dateHandler(req, res) {
	let params = req.params.date

	function getDate(param) {
		let date = param ? new Date(param) : new Date()

		return {
			utc: date.toString(),
			unix: date.getTime()
		}
	}

	// if no params return date now
	if (!params) {
		return res.send(getDate())
	}
	// if params is number parse as unix time
	else if (Number(params) == params) {
		return res.send(getDate(Number(params)))
	}
	// if params is valid date string parse as date
	else if (new Date(params).toString() != 'Invalid Date') {
		return res.send(getDate(params))
	}
	// else send error
	else {
		return res.send({ error: 'Invalid Date' })
	}
}

app.listen(PORT, () => { console.log('Listening on ' + PORT) })
