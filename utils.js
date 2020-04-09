exports.getTimeNowString = () => {
	let miliseconds = Date.now();
	let dateNow = new Date(miliseconds * 1000);
	return dateNow.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};
