import axios from 'axios';
describe('iOS App Automation - Network Throttling', () => {
    it('should complete the referral login flow', async () => {

        console.log('Waiting for app to load...');
        await browser.pause(7000); // Wait 7 sec for app to fully load

        console.log('Opening app...');
        const checkbox = await $('//*[@name="checkbox"]');
        const signInButton = await $('//*[@name="login"]');

        await checkbox.waitForExist({ timeout: 20000 });
        await checkbox.click();
        console.log('Clicked on checkbox');

        await signInButton.waitForExist({ timeout: 20000 });
        await signInButton.click();
        console.log('Clicked on sign-in button');

        // Wait extra after navigation
        await browser.pause(5000); 

        let emailField, passwordField;

        try {
            await browser.waitUntil(
                async () => {
                    const elem = await $('//*[@name="email"]');
                    return await elem.isExisting();
                },
                {
                    timeout: 20000,
                    timeoutMsg: 'Email field not found within 20 seconds'
                }
            );
            emailField = await $('//*[@name="email"]');
            await emailField.setValue('wwqa1auto1@test.com');
            console.log('Entered Email');
        } catch (err) {
            console.log('Email field not found, skipping email entry.');
        }

        await browser.pause(1000);
        
        // const sessionId = await browser.getSessionId();
    // console.log('Session ID:', sessionId);
        // await driver.execute('lambda-hook: {"action": "updateNetworkProfile", "arguments": {"profile": "offline"}}');
        // console.log('Network throttling set to offline');

    const sessionId = browser.sessionId;
    console.log('Session ID:', sessionId);

    // API call to update network
    try {
        const response = await axios.post(
            `https://mobile-api.lambdatest.com/mobile-automation/api/v1/sessions/${sessionId}/update_network`,
            {
                mode: 'offline'
            },
            {
                headers: {
                    Authorization: 'Basic xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Network update response:', response.data);
    } catch (error) {
        console.error('Failed to update network mode:', error);
    }




        try {
            await browser.waitUntil(
                async () => {
                    const elem = await $('//*[@value="Password"]');
                    return await elem.isExisting();
                },
                {
                    timeout: 20000,
                    timeoutMsg: 'Password field not found within 20 seconds'
                }
            );
            passwordField = await $('//*[@value="Password"]');
            await passwordField.setValue('Password123');
            console.log('Entered Password');
        } catch (err) {
            console.log('Password field not found, skipping password entry.');
        }

        const loginButton = await $('//*[@name="login"]');
        await loginButton.waitForExist({ timeout: 20000 });
        await loginButton.click();
        console.log('Clicked on login button');

        console.log('Waiting for 90 seconds before handling location pop-up...');
        await browser.pause(90000);

        await browser.setTimeout({ implicit: 120000 });

        try {
            const allowButton = await $('//*[@name="Allow While Using App"]');
            if (await allowButton.isDisplayed()) {
                await allowButton.click();
                console.log('Location pop-up dismissed');
            }
        } catch (error) {
            console.log('No location pop-up detected');
        }

        await browser.pause(3000);
        await driver.pause(5000);
    });

    afterEach(async function () {
        if (this.currentTest?.state === 'passed') {
            await driver.execute('lambda-status=passed');
            console.log('Test marked as PASSED in LambdaTest');
        } else {
            await driver.execute('lambda-status=failed');
            console.log('Test marked as FAILED in LambdaTest');
        }
    });
});

