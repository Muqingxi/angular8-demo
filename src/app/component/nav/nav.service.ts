import { ElementRef, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { filterMenu } from 'src/app/app.filter'
import { navList } from 'src/app/interface/index'

export class navService {
    constructor(
        private router: Router,
        private ref: ElementRef,
        private cdref: ChangeDetectorRef) { }
    init(): navList[] {
        let ls = this.getLS('nav')
        if (ls) {
            return ls
        } else {
            let arr = this.getInitRoute()
            let home = arr[0].data
            let navList = [
                {
                    key: home.key,
                    name: home.name,
                    link: home.link
                }
            ]
            this.setLS('nav', navList)
            return navList
        }
    }
    getInitRoute() {
        // 不可直接改变this.router.config
        let arr = this.router.config.map(route => route)
        filterMenu(arr)
        return arr
    }
    getLinear(source = [], target?) {
        let arr = target || []
        for (let i = 0; i < source.length; i++) {
            if (source[i].data) {
                arr.push(source[i])
            }
            if (source[i].children) {
                this.getLinear(source[i].children, arr)
            }
        }
        return arr
    }
    addTag(source: navList[], item: navList) {
        let flag = source && source.find(nav => nav.key === item.key)
        if (!flag && source) {
            source.push(item)          
        }
        this.setLS('nav', source)
    }
    closeTag(source: navList[], i: number) {
        source.splice(i, 1)
        this.setLS('nav', source)
    }
    getEl(id: String) {
        return this.ref.nativeElement.querySelector('.' + id)
    }
    getWidth(id: String) {
        let el = this.getEl(id)
        return {
            w: el.offsetWidth,
            l: el.offsetLeft
        }
    }
    getLeft(source: navList[], key: String): number {
        this.cdref.detectChanges()
        let lw = this.getWidth('nav-list').w
        let sw = this.getWidth('nav-scroll').w
        if (sw - lw > 0) {
            let i = source && source.findIndex(nav => nav.key === key)
            let current = this.getEl('nav-scroll').children[i]
            if (current) {
                let cw = current.offsetWidth
                let cl = current.offsetLeft
                return cw + cl > lw ? -(cw + cl - lw + 5) : 0
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    move(direction: String, left: number): number {
        let over = this.getWidth('nav-scroll').w - this.getWidth('nav-list').w
        if (over > 0) {
            return direction === 'right' ? Math.max(-over - 5, left -240) : Math.min(0, left + 240)
        }
    }
    setLS(key = '', source: any) {
        localStorage.setItem(key, JSON.stringify(source))
    }
    getLS(key = '') {
        let nav = localStorage.getItem(key)
        return nav && JSON.parse(nav)
    }
}