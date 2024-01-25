class HttpError extends Error {
	constructor(message, errorCode) {
		super(message); // Add Message property
		this.code = errorCode;
	}
}

export default HttpError;
