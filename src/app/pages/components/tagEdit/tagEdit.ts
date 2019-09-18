import { Component } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

@Component({
    selector: 'com-tag-edit',
    templateUrl: './tagEdit.html',
    styleUrls: ['./tagEdit.less']
})
export class tagEditComponent {
    list = ['UZI', 'SSM']
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            // console.log(params['id'])
        })
    }
}

