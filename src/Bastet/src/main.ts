/// <reference path="./../typings/index.d.ts"/>

import {Aurelia} from 'aurelia-framework'
import environment from './environment';

//Configure Bluebird Promises.
(<any>Promise).config({
    longStackTraces: environment.debug,
    warnings: {
        wForgottenReturn: false
    }
});

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature('resources')
        .plugin('aurelia-oauth', configureOauth);

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
}

function configureOauth(oauthService: IOAuthService) {
    oauthService.configure(
        {
            loginUrl: 'https://login.microsoftonline.com/4e5cd1f3-0c71-48ae-ac00-d616a5b006af/oauth2/authorize',
            logoutUrl: 'https://login.microsoftonline.com/4e5cd1f3-0c71-48ae-ac00-d616a5b006af/oauth2/logout',
            clientId: '9b551fa6-aeb4-4b6b-875d-f96eb2f9b891',
            alwaysRequireLogin: false
        });
}