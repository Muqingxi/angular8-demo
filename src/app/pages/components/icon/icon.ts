import { Component } from '@angular/core'
// import { dateFormat } from 'src/app/app.filter'

@Component({
    selector: 'com-icon',
    templateUrl: './icon.html',
    styleUrls: ['./icon.less']
})
export class iconComponent {
    arr = [
        {uni: '\ue608' },
        {uni: '\ue609' },
        {uni: '\ue60c' },
        {class: 'icon-bukejian' },
        {class: 'icon-kefu' },
        {class: 'icon-monikaoshi' },
        {class: 'icon-food-chips' },
        {class: 'icon-food-popsicle' },
        {class: 'icon-food-macaron' },
    ]
}

