import { Component } from '@angular/core'
import { dateFormat } from 'src/app/app.filter'

@Component({
    selector: 'com-input',
    templateUrl: './input.html',
    styleUrls: ['./input.less']
})
export class inputComponent {
    gutter = 36;
    text = '';
    number = '';
    money = '';
    thousands = '111222333';
    dateRange = '';
    start = '';
    end = '';
    startLimit = (current: Date): boolean => {
        return new Date(dateFormat(current)) >= new Date(this.end)
    }
    endLimit = (current: Date): boolean => {
        return new Date(dateFormat(current)) <= new Date(this.start)
    }
    formatDate(input, type) {
        if(type === 'arr') this[input] = this[input].map(item => item && dateFormat(item))
        else this[input] = dateFormat(this[input])
    }
}

