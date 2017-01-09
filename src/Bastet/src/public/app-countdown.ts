/// <reference path="./../../typings/index.d.ts"/>

import {bindable, inject, bindingMode} from 'aurelia-framework';
import 'jquery';
import 'jquery-countdown';

interface countdown extends JQuery {
    countdown: (date: any, event?: any) => void;
    start: () => void
}

@inject(Element)
export class AppCountdown {
    @bindable({ defaultBindingMode: bindingMode.oneTime }) date;
    weekTemplate: string = '<div class="week-wrapper"><span class="week">%w</span><br />semaines</div>';
    dayTemplate: string = '<div class="days-wrapper"><span class="days">%d</span><br />jours</div>';
    hourTemplate: string = '<div class="hours-wrapper"><span class="hours">%H </span><br />heures</div>';
    minuteTemplate: string = '<div class="minutes-wrapper"><span class="minutes">%M</span><br />minutes</div>';
    rootRef: Element;
    dateParts = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        n: 60000,
        s: 1000
    };

    attached() {
        this.setTimer(this.date);
    }

    constructor(el) {
        this.rootRef = el;
    }

    public setTimer(valueDate: Date) {
        var offset = valueDate.valueOf() - Date.now().valueOf();
        var nbDays = offset / this.dateParts['d'];
        var template = this.dayTemplate + this.hourTemplate;
        if (nbDays > 40) {
            template = this.weekTemplate + template;
        }
        else {
            template = template + this.minuteTemplate;
        }

        (<countdown>$(this.rootRef)).countdown(this.date, function (event) {
            $(this).find(".timer").html(event.strftime(template));
        })
    }
}