'use strict';
import 'jest-allure/dist/setup';
import { Status } from 'jest-allure/dist/Reporter';
const screenshot = require('screenshot-desktop');

export function step(name: string) {
	return function decorator(target: any, key: any, descriptor: any) {
		const original = descriptor.value;
		if (typeof original === 'function') {
			descriptor.value = function(...args: any) {
				if (name) {
					reporter.startStep(name);
				} else {
          reporter.startStep(key);
				}
				return original
					.apply(this, args)
					.then((data: any) => {
            reporter.endStep(Status.Passed);
						return data;
					})
					.catch((error: any) => {
            screenshot({format: 'png'}).then((img: string) => {
              reporter.addAttachment(`${error} on ${name}`, img,'image/png');
            });
            reporter.endStep(Status.Failed);
            throw error;
					});
			};
		}
		return descriptor;
	};
}
