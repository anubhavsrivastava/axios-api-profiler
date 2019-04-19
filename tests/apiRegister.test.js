import APIRegister from '../src/apiRegister';

describe('axios interceptor - API Register', () => {
	test('should create an instance of API register with public functions', () => {
		let registerInstance = new APIRegister();
		expect(registerInstance).toHaveProperty('getRegister');
		expect(registerInstance).toHaveProperty('addAPIForProfiling');
		expect(registerInstance).toHaveProperty('completeApiProfiling');
	});

	test('should initialize empty register', () => {
		let registerInstance = new APIRegister();
		let registry = registerInstance.getRegister();
		expect(registry).toEqual({});
	});

	test('should use add api in registry to add start time', () => {
		let registerInstance = new APIRegister();
		let sampleAxiosRequestAPIConfig = {};
		let registryEntry = registerInstance.addAPIForProfiling(sampleAxiosRequestAPIConfig);
		expect(sampleAxiosRequestAPIConfig).toHaveProperty('reqID');
		expect(registryEntry).toHaveProperty('endTime', -1);
		expect(registryEntry).toHaveProperty('startTime');
		expect(registryEntry['startTime']).toBeInstanceOf(Date);

		let registry = registerInstance.getRegister();
		expect(registry).toHaveProperty(sampleAxiosRequestAPIConfig['reqID'].toString(), registryEntry);
	});

	test('should use complete api in registry to add end time', () => {
		let registerInstance = new APIRegister();
		let sampleAxiosRequestAPIConfig = {};
		let registryEntryBeforeCompletion = registerInstance.addAPIForProfiling(sampleAxiosRequestAPIConfig);
		expect(sampleAxiosRequestAPIConfig).toHaveProperty('reqID');
		expect(registryEntryBeforeCompletion).toHaveProperty('endTime', -1);
		expect(registryEntryBeforeCompletion).toHaveProperty('startTime');
		let sampleAxiosResponseAPIConfig = { config: sampleAxiosRequestAPIConfig };
		let registryEntryAfterCompletion = registerInstance.completeApiProfiling(sampleAxiosResponseAPIConfig);
		expect(registryEntryAfterCompletion).toHaveProperty('endTime');
		expect(registryEntryAfterCompletion['endTime']).toBeInstanceOf(Date);
	});

	test('should return null for completion API if it was not added in registry before', () => {
		let registerInstance = new APIRegister();
		let sampleAxiosRequestAPIConfig = {};
		let sampleAxiosResponseAPIConfig = { config: sampleAxiosRequestAPIConfig };
		let registryEntryAfterCompletion = registerInstance.completeApiProfiling(sampleAxiosResponseAPIConfig);
		expect(registryEntryAfterCompletion).toBe(null);
	});
});
