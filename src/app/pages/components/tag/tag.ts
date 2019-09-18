import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'com-tag',
    templateUrl: './tag.html',
    styleUrls: ['./tag.less']
})
export class tagComponent {
    list = [
        {id: 1, name: 'UZI'},
        {id:2, name: 'SSM'}
    ]
    constructor(private router: Router) {}
    toEdit(queryParams) {
        this.router.navigate(['/components/tagEdit'], {queryParams})
    }
}

