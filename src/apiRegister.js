export default class APIRegister {
	constructor() {
		this.requestDictionary = {};
		this.index = 1;
	}

	getRegister() {
		return this.requestDictionary;
	}

	addAPIForProfiling(axiosRequestConfig) {
		const id = this.index++;
		const currentRequest = {
			startTime: new Date(),
			endTime: -1
		};

		axiosRequestConfig.reqID = id;
		this.requestDictionary[id] = currentRequest;
		return this.requestDictionary[id];
	}

	completeApiProfiling(axiosResponseConfig) {
		if (axiosResponseConfig.config.reqID) {
			const id = axiosResponseConfig.config.reqID;
			this.requestDictionary[id]['endTime'] = new Date();
			this.requestDictionary[id]['config'] = axiosResponseConfig;

			return this.requestDictionary[id];
		}
		return null;
	}
}
