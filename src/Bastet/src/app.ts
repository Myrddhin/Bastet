import {Router, RouterConfiguration} from 'aurelia-router';
import {OAuthService, OAuthTokenService} from 'aurelia-oauth';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject, bindable} from 'aurelia-framework';

@inject(OAuthService, OAuthTokenService, EventAggregator)
export class App {
    authenticated: boolean;
    message: string;
    router: Router;
    constructor(private authService: IOAuthService, private tokenService: IOAuthTokenService, private eventAggregator: EventAggregator) {
        this.message = "Welcome to Bastet!";
        var data: IOAuthTokenData;
        data = <IOAuthTokenData>this.tokenService.getToken();
        // console.log("%O", data);
        this.authenticated = data != undefined;
        eventAggregator.subscribe(OAuthService.LOGIN_SUCCESS_EVENT, () => { this.authenticated = true; console.info("Authenticated"); });
        eventAggregator.subscribe(OAuthService.INVALID_TOKEN_EVENT, () => { this.authenticated = false; console.info("False token"); });
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Leïla & Yann';
        //config.options.pushState = true;
        //config.options.root = '/';
        config.map([

            { route: '', redirect: 'rsvp' },
            { route: 'rsvp', moduleId: './public/rsvp', title: 'RSVP', nav: true },
            { route: 'fairepart', moduleId: './public/fairepart', title: 'Faire part', nav: true },
            { route: 'infos', moduleId: './public/infos', title: 'Informations utiles', nav: true }
        ]);

        this.router = router;
    }

    attached() {
        var data: IOAuthTokenData;
        data = <IOAuthTokenData>this.tokenService.getToken();
        // console.log("%O", data);
        this.authenticated = data != undefined;
        // console.log("%O", data != undefined);
    }

    authenticate() {
        return this.authService.login();
    }

    logoff() {
        return this.authService.logout();
    }
}