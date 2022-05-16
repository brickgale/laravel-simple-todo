export const checkNull = (value) => {
	if(typeof value == 'undefined' || !value) return false
	if(typeof value == 'object' && Object.keys(value).length === 0) return false // for empty objects
	return true
}