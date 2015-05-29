var Ractive = require('ractive')
var daysLeftCalculator = require('./days-left-calculator')
var ageCalculator = require('./age-calculator')

var daysLeftRact = new Ractive({
	el: '#days-left-insert',
	template: '#days-left-template',
	data: {
		age: null,
		days: null,
		stage: null
	}
})

daysLeftRact.observe('age', function setTheStage(age) {
	var calculated = daysLeftCalculator(age)
	if (calculated) {
		this.set('days', calculated.days)
		this.set('stage', calculated.stage)
	} else {
		this.set('days', null)
		this.set('stage', null)
	}
})

var ageRact = new Ractive({
	el: '#age-insert',
	template: '#age-template',
	data: {
		daysLeft: null,
		years: null,
		days: null
	}
})

ageRact.observe('daysLeft', function calculateTheAge(daysLeft) {
	var self = this
	function clearValues() {
		self.set('years', null)
		self.set('days', null)
	}
	if (daysLeft) {
		var age = ageCalculator(daysLeft)
		if (age) {
			this.set('years', age.years)
			this.set('days', age.days)
		} else {
			clearValues()
		}
	} else {
		clearValues()
	}
})
