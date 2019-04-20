import APIRegister from '../src/apiRegister';
import axiosRequestProfiler, { APIProfiler } from '../src/index';

jest.mock('../src/apiRegister');

describe('axios interceptor - api profiler', () => {
	beforeEach(() => {
		APIRegister.mockClear();
	});
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
		expect(axiosMock.interceptors.request.use).toBeCalled();
		expect(axiosMock.interceptors.response.use).toBeCalled();
	});

	test('should get all API Profiling data', () => {
		// mockClear() is working:
		expect(APIRegister).not.toHaveBeenCalled();

		const apiProfilerInstance = new APIProfiler();
		// Constructor should have been called again:
		expect(APIRegister).toHaveBeenCalledTimes(1);

		apiProfilerInstance.getAPIProfileData();
		const mockAPIRegisterInstance = APIRegister.mock.instances[0];
		console.log(mockAPIRegisterInstance);
		const mockGetRegister = mockAPIRegisterInstance.getRegister;
		expect(mockGetRegister).toHaveBeenCalledWith();
		expect(mockGetRegister).toHaveBeenCalledTimes(1);
	});

	test('should mark an api for profiling', () => {});

	test('should not mark an api for profiling if ignoreApiProfiling flag used', () => {});

	test('should complete api profile for an api', () => {});

	test('should not complete api profile for an api if ignoreApiProfilingLogs flag used', () => {});

	test('should complete api profile for an api but not log the details if ignoreApiProfilingLogs flag used', () => {});
});
