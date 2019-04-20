import APIRegister from './apiRegister';

export class APIProfiler {
	constructor() {
		this.registerInstance = new APIRegister();
	}
	getAPIProfileData() {
		return this.registerInstance.getRegister();
	}

	responseProfilingCollector(axiosConfig) {
		if (!axiosConfig.config.ignoreApiProfiling) {
			const profilingData = this.registerInstance.completeApiProfiling(axiosConfig);

			if (!axiosConfig.config.ignoreApiProfilingLogs) {
				console.log('%c Request Profile:', 'color: #4CAF50; font-weight: bold', ` ${profilingData.config.config.url} [${profilingData.config.request.status}] took ${profilingData['endTime'] - profilingData['startTime']} ms`);
			}
		}

		return axiosConfig;
	}

	requestProfilingMarker(axiosConfig) {
		if (!axiosConfig.ignoreApiProfiling) {
			this.registerInstance.addAPIForProfiling(axiosConfig);
		}

		return axiosConfig;
	}
}

const defaultApiProfilerInstance = new APIProfiler();

export default function axiosRequestProfiler(axios) {
	axios.interceptors.request.use(defaultApiProfilerInstance.requestProfilingMarker);
	axios.interceptors.response.use(defaultApiProfilerInstance.responseProfilingCollector);
}
