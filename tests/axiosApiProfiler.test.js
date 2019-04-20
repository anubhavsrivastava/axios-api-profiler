import APIRegister from '../src/apiRegister';

jest.mock('../src/apiRegister', () => {
	return jest.fn().mockImplementation(() => {
		return { getRegister: jest.fn() };
	});
});
import axiosRequestProfiler, { getAPIProfileData, responseProfilingCollector, requestProfilingMarker } from '../src/index';

beforeEach(() => {
	APIRegister.mockClear();
});

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

	test('should get all API Profiling data', () => {});

	test('should mark an api for profiling', () => {});

	test('should not mark an api for profiling if ignoreApiProfiling flag used', () => {});

	test('should complete api profile for an api', () => {});

	test('should not complete api profile for an api if ignoreApiProfilingLogs flag used', () => {});

	test('should complete api profile for an api but not log the details if ignoreApiProfilingLogs flag used', () => {});
});
