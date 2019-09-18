import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { filterMenu } from './app.filter'
import { navComponent } from './component/nav/nav'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isCollapsed = false
    routeArr
    constructor(private router: Router) { }
    @ViewChild('nav', {static: false}) nav: navComponent
    ngOnInit() {
        this.routeArr = this.router.config.map(route => route)
        filterMenu(this.routeArr)
    }
    slide() {
        this.nav.slide()
    }
}
