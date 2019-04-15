import APIRegister from './apiRegister';

const registerInstance = new APIRegister();

function responseProfilingCollector(axiosConfig) {
	if (!axiosConfig.config.ignoreApiProfiling) {
		const profilingData = registerInstance.completeApiProfiling(axiosConfig);

		if (!axiosConfig.config.ignoreApiProfilingLogs) {
			console.log('%c Request Profile:', 'color: #4CAF50; font-weight: bold', ` ${profilingData.config.config.url} [${profilingData.config.request.status}] took ${profilingData['endTime'] - profilingData['startTime']} ms`);
		}
	}

	return axiosConfig;
}

function requestProfilingMarker(axiosConfig) {
	if (!axiosConfig.ignoreApiProfiling) {
		registerInstance.addAPIForProfiling(axiosConfig);
	}

	return axiosConfig;
}

export default function axiosRequestProfiler(axios) {
	axios.interceptors.request.use(requestProfilingMarker);
	axios.interceptors.response.use(responseProfilingCollector);
}
