import { Component, Input } from '@angular/core'
import { PlatformLocation } from '@angular/common'
import { Router } from '@angular/router'
import { navService } from '../nav/nav.service'

@Component({
    selector: 'app-remove',
    templateUrl: './removeTag.html',
    styleUrls: ['./removeTag.less'],
    providers: [navService]
})
export class removeComponent {
    @Input() to
    @Input() size = 'default'
    @Input() type = 'primary'
    @Input() text = '返回'
    constructor(private nav: navService, private location: PlatformLocation, private router: Router) {}
    remove() {
        let navArr = this.nav.getLS('nav')
        let i = navArr.findIndex(nav => nav.link === this.location.pathname)
        this.nav.setLS('removeIndex', i)
        let pre
        if (this.to) {
            let curr = navArr.find(nav => nav.key === this.to)
            pre = curr ? curr : navArr[i - 1]
        } else {
            pre = navArr[i - 1]
        }
        this.router.navigate([pre.link], {queryParams: pre.params})
    }
}

