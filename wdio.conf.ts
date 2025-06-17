import type { Options } from '@wdio/types';

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    exclude: [],
    maxInstances: 1,
    services: ['lambdatest'],
    user: 'belalahmad',
    key: 'LT_7VDCei73IDbSY28Yxz9fbocgnw9Ja4ryhwGP4HccHy967Rc',

    capabilities: [
        {
            platformName: 'iOS',
            'appium:automationName': 'XCUITest',
            'appium:includeSafariInWebviews': true,
            'appium:autoWebview': true,
            'lt:options': {
                app: 'lt://APP10160491651749914293412353',
                isRealMobile: true,
                deviceName: 'iPhone 15 Pro',
                platformVersion: 17,
                autoAcceptAlerts: true,
                autoGrantPermissions: true,
                iosLiveInteraction: true,
                network: true,
                tunnel: false,
                visual: true,
                w3c: false,
                // networkProfile: "3g-umts-good",
                location: {
		        "lat": "40.1431",
		        "long": "47.5769"
	                    },
                'settings[respectSystemAlerts]': true
            } as any
        }
    ],

    logLevel: 'info',
    bail: 0,
    hostname: 'mobile-hub.lambdatest.com',
    port: 80,
    path: '/wd/hub',
    waitforTimeout: 120000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        timeout: 180000 // ⬅️ Increase Mocha timeout to 3 mins
    }
};

// Define common capabilities separately
const commonCapabilities = {
    build: '[worldwinner-] Network Throttling Offline Test',
    name: '[iOS] test '
};

// Apply common capabilities to all capabilities
(config.capabilities as any[]).forEach((caps) => {
    Object.assign(caps['lt:options'], commonCapabilities);
});

export default config;
