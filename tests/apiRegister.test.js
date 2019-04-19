import APIRegister from '../src/apiRegister';

describe('axios interceptor - API Register', () => {
	test('should create an instance of API register with public functions', () => {
		let register = new APIRegister();
		expect(register).toHaveProperty('getRegister');
		expect(register).toHaveProperty('addAPIForProfiling');
		expect(register).toHaveProperty('completeApiProfiling');
	});
});
