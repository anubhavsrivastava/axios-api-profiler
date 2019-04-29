# Axios API Profiler

Axios interceptor that profiles HTTP responses for timings

[![Build Status](https://travis-ci.org/anubhavsrivastava/axios-api-profiler.svg?branch=master)](https://travis-ci.org/anubhavsrivastava/axios-api-profiler)
[![Coverage Status](https://coveralls.io/repos/github/anubhavsrivastava/axios-api-profiler/badge.svg?branch=master)](https://coveralls.io/github/anubhavsrivastava/axios-api-profiler?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub issues](https://img.shields.io/github/issues/anubhavsrivastava/axios-api-profiler.svg?style=flat-square)](https://github.com/anubhavsrivastava/axios-api-profiler/issues)
[![HitCount](http://hits.dwyl.io/anubhavsrivastava/axios-api-profiler.svg)](http://hits.dwyl.io/anubhavsrivastava/axios-api-profiler)

[![NPM](https://nodei.co/npm/axios-api-profiler.png?downloads=true&stars=true)](https://nodei.co/npm/axios-api-profiler/)

<!-- toc -->

<!-- tocstop -->

---

## Introduction

Axios API Profiler is interceptor for axios that profiles for time each axios based call takes including network time + axios handling time (including middleware time)

## Profiling info

API profilong is only for time. This includes time taken by axios to process the request and network time.

## Install

```
$ npm install axios-api-profiler --save
```

or

```
yarn add axios-api-profiler
```

## Usage

Import `axiosRequestProfiler` to register it as interceptor for axios that will profile all APIs.

### Simple usage

    import axios from 'axios';
    import {axiosRequestProfiler} from 'axios-api-profiler';

    // ... middleware chain
    axiosRequestProfiler(axios)

`axiosRequestProfiler` function also accepts instance of axios as its parameter.

## Configuration

One can disable this interceptor by passing `ignoreApiProfiling` as configuration in axios instance or per axios api call. This configuration can also be set on `axios.default` object.

| Setting Name           | type      | description                                             | default value |
| ---------------------- | --------- | ------------------------------------------------------- | ------------- |
| ignoreApiProfiling     | `Boolean` | Flag to disable profiling                               | `false`       |
| ignoreApiProfilingLogs | `Boolean` | Flag to disable `console` logging of API profile timing | `false`       |

1. To disable profiling for specific call


        axios.get('/users', { ignoreApiProfiling;:true } ).then(response=>{
            //response is standard axios response with config, header, status, data, statusText
        })

    This config as parameter is available for all calls(get, post, put, etc) in axios, refer [here](https://www.npmjs.com/package/axios#request-method-aliases).

2.  To disable interceptor for all calls of a instance (if already configured as interceptor in axios default configuration)

        const instance = axios.create({ignoreApiProfiling: true});

3.  To continue profiling and not log timing on `console`, use `ignoreApiProfilingLogs` flag,

        axios.get('/users', { ignoreApiProfilingLogs;:true } ).then(response => {
            //api timing wont be logged on console
        })

---

## Contribution

Suggestions and PRs are welcome!

Please read the [contribution guidelines](CONTRIBUTING.md) to get started.

<!-- Change contributing.md -->

---

## License

[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](LICENSE)

refer `LICENSE` file in this repository.

---
