import APIRegister from './apiRegister';

export class APIProfiler {
	constructor() {
		this.registerInstance = new APIRegister();
	}
	getAPIProfileData = () => {
		return this.registerInstance.getRegister();
	}

	responseProfilingCollector = (axiosConfig) => {
		if (!axiosConfig.config.ignoreApiProfiling) {
			const profilingData = this.registerInstance.completeApiProfiling(axiosConfig);

			if (!axiosConfig.config.ignoreApiProfilingLogs) {
				profilingData ? console.log('%c Request Profile:', 'color: #4CAF50; font-weight: bold', ` ${profilingData.config.config.url} [${profilingData.config.status}] took ${profilingData['endTime'] - profilingData['startTime']} ms`) : console.log('No Profiling Data');
			}
		}

		return axiosConfig;
	}

	requestProfilingMarker = (axiosConfig) => {
		if (!axiosConfig.ignoreApiProfiling) {
			this.registerInstance.addAPIForProfiling(axiosConfig);
		}

		return axiosConfig;
	}
}


export const defaultApiProfilerInstance = new APIProfiler();
export const axiosRequestProfiler = (axios) => {
	axios.interceptors.request.use(defaultApiProfilerInstance.requestProfilingMarker);
	axios.interceptors.response.use(defaultApiProfilerInstance.responseProfilingCollector);
}
export default axiosRequestProfiler;