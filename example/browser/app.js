import axios from 'axios';
import axiosRequestProfiler, { defaultApiProfilerInstance } from '../../dist/index';

console.log(axiosRequestProfiler)
// ... middleware chain
axiosRequestProfiler(axios)
axios.defaults.ignoreApiProfilingLogs = true;
let count = 0;
const getTodos = () => {
    if (count < 10) {
        try {
            axios.get(`http://www.mocky.io/v2/5ed51f163300004c00f7a822?mocky-delay=${Math.floor(Math.random() * 100)}ms`);

        } catch (e) {
            console.error(e);
        }
        setTimeout(getTodos, 100);
        count++;
    }
    else {
        console.table(defaultApiProfilerInstance.getAPIProfileData(), ["startTime", "endTime"])
    }
};


setTimeout(getTodos, 100);