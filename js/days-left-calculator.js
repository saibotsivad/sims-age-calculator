module.exports = function(years) {
	if (years > 0 && years < 6) {
		return {
			days: 72 - years * 12,
			stage: 'toddler'
		}
	} else if (years >= 6 && years < 13) {
		return {
			days: 84 - (years * 12 - 72),
			stage: 'child'
		}
	} else if (years >= 13 && years < 19) {
		return {
			days: 72 - (years * 12 - 72 - 84),
			stage: 'teen'
		}
	} else if (years >= 19 && years < 65) {
		return {
			days: 552 - (years * 12 - 72 - 84 - 72),
			stage: 'adult'
		}
	} else {
		return undefined
	}
}
