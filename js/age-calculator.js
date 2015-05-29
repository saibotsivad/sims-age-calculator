module.exports = function(daysRemaining) {
	if (daysRemaining < 553 && daysRemaining >= 0) {
		var daysAvailableInLife = 552 + 72 + 84 + 72
		var daysElapsedInLife = daysAvailableInLife - daysRemaining

		var yearsElapsed = Math.floor(daysElapsedInLife / 12)
		var daysOfLastYearElapsed = daysElapsedInLife % 12

		return {
			years: yearsElapsed,
			days: daysOfLastYearElapsed
		}
	} else {
		return undefined
	}
}
