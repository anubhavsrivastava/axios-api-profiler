import axiosRequestProfiler, { getAPIProfileData, responseProfilingCollector, requestProfilingMarker } from '../src/index';

describe('axios interceptor - api profiler', () => {
	test('should add itself in interceptor chain of axios', () => {
		let axiosMock = {
			interceptors: {
				request: {
					use: jest.fn()
				},
				response: {
					use: jest.fn()
				}
			}
		};
		axiosRequestProfiler(axiosMock);
		expect(axiosMock.interceptors.request.use).toBeCalledWith(requestProfilingMarker);
		expect(axiosMock.interceptors.response.use).toBeCalledWith(responseProfilingCollector);
	});
});
