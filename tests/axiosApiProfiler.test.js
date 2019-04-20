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
		const mockGetRegister = mockAPIRegisterInstance.getRegister;
		expect(mockGetRegister).toHaveBeenCalledWith();
		expect(mockGetRegister).toHaveBeenCalledTimes(1);
	});

	test('should mark an api for profiling', () => {
		expect(APIRegister).not.toHaveBeenCalled();

		const apiProfilerInstance = new APIProfiler();
		// Constructor should have been called again:
		expect(APIRegister).toHaveBeenCalledTimes(1);

		const axiosConfig = {};
		apiProfilerInstance.requestProfilingMarker(axiosConfig);
		const mockAPIRegisterInstance = APIRegister.mock.instances[0];
		const mockAddAPIForProfiling = mockAPIRegisterInstance.addAPIForProfiling;
		expect(mockAddAPIForProfiling).toHaveBeenCalledWith(axiosConfig);
		expect(mockAddAPIForProfiling).toHaveBeenCalledTimes(1);
	});

	test('should not mark an api for profiling if ignoreApiProfiling flag used', () => {
		expect(APIRegister).not.toHaveBeenCalled();

		const apiProfilerInstance = new APIProfiler();
		// Constructor should have been called again:
		expect(APIRegister).toHaveBeenCalledTimes(1);

		const axiosConfig = { ignoreApiProfiling: true };
		const response = apiProfilerInstance.requestProfilingMarker(axiosConfig);
		const mockAPIRegisterInstance = APIRegister.mock.instances[0];
		const mockAddAPIForProfiling = mockAPIRegisterInstance.addAPIForProfiling;
		expect(response).toBe(axiosConfig);
		expect(mockAddAPIForProfiling).not.toHaveBeenCalled();

		expect(mockAddAPIForProfiling).toHaveBeenCalledTimes(0);
	});

	test('should complete api profile for an api', () => {
		expect(APIRegister).not.toHaveBeenCalled();
		global.console = { log: jest.fn() };

		const apiProfilerInstance = new APIProfiler();
		// Constructor should have been called again:
		expect(APIRegister).toHaveBeenCalledTimes(1);

		const axiosConfig = {
			config: {}
		};
		apiProfilerInstance.responseProfilingCollector(axiosConfig);
		const mockAPIRegisterInstance = APIRegister.mock.instances[0];
		const mockCompleteApiProfiling = mockAPIRegisterInstance.completeApiProfiling;
		expect(mockCompleteApiProfiling).toHaveBeenCalledWith(axiosConfig);
		expect(mockCompleteApiProfiling).toHaveBeenCalledTimes(1);
		expect(console.log).toBeCalled();
	});

	test('should not complete api profile for an api if ignoreApiProfilingLogs flag used', () => {
		expect(APIRegister).not.toHaveBeenCalled();

		const apiProfilerInstance = new APIProfiler();
		// Constructor should have been called again:
		expect(APIRegister).toHaveBeenCalledTimes(1);

		const axiosConfig = {
			config: { ignoreApiProfiling: true }
		};
		const response = apiProfilerInstance.responseProfilingCollector(axiosConfig);
		const mockAPIRegisterInstance = APIRegister.mock.instances[0];
		const mockCompleteApiProfiling = mockAPIRegisterInstance.completeApiProfiling;
		expect(response).toBe(axiosConfig);
		expect(mockCompleteApiProfiling).not.toHaveBeenCalled();
		expect(mockCompleteApiProfiling).toHaveBeenCalledTimes(0);
	});

	test('should complete api profile for an api but not log the details if ignoreApiProfilingLogs flag used', () => {
		expect(APIRegister).not.toHaveBeenCalled();
		global.console = { log: jest.fn() };

		const apiProfilerInstance = new APIProfiler();
		// Constructor should have been called again:
		expect(APIRegister).toHaveBeenCalledTimes(1);
		const axiosConfig = {
			config: { ignoreApiProfiling: true, ignoreApiProfilingLogs: true }
		};
		const response = apiProfilerInstance.responseProfilingCollector(axiosConfig);
		const mockAPIRegisterInstance = APIRegister.mock.instances[0];
		const mockCompleteApiProfiling = mockAPIRegisterInstance.completeApiProfiling;
		expect(response).toBe(axiosConfig);
		expect(mockCompleteApiProfiling).not.toHaveBeenCalled();
		expect(mockCompleteApiProfiling).toHaveBeenCalledTimes(0);
		expect(console.log).not.toBeCalled();
	});
});
