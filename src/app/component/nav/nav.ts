import { Component } from '@angular/core'
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router'
import { navList } from 'src/app/interface/index'
import { navService } from './nav.service'
import { PlatformLocation } from '@angular/common'
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown'

@Component({
    selector: 'app-nav',
    templateUrl: './nav.html',
    styleUrls: ['./nav.less'],
    providers: [navService]
})
export class navComponent {
    only = false
    type = 'router'
    left = 0
    navList: navList[]
    linearArr
    addItem: navList
    constructor(
        private navService: navService,
        private router: Router,
        private route: ActivatedRoute,
        private location: PlatformLocation,
        private nzContextMenuService: NzContextMenuService) { }
    ngOnInit() {
        // 获取导航列表
        this.navList = this.navService.init()
        // 获取一维路由列表
        this.linearArr = this.navService.getLinear(this.navService.getInitRoute())
        this.route.queryParams.subscribe((params: Params) => {
            // !this.addItem.icon-不在左侧菜单内的项
            this.setCurrent(this.linearArr)
            if (JSON.stringify(params) !== "{}" && !this.only && !this.addItem.icon) {
                this.addItem.key = this.addItem.key + params.id
                this.addItem.name = params.name
                this.addItem.params = params
                // flag
                this.type = 'params'
            }
        })
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // 是否有关闭标签
                let i = this.navService.getLS('removeIndex')
                if (i) {
                    this.navService.closeTag(this.navList, i)
                }
                if (this.type === 'router') {
                    this.setCurrent(this.linearArr)
                } else {
                    this.type = 'router'
                }
                if (!this.addItem) return
                // 添加tag标签
                this.navService.addTag(this.navList, Object.assign({}, this.addItem))
                // 设置当前url下的left
                this.left = this.navService.getLeft(this.navList, this.addItem.key)
                // 清空removeIndex
                this.navService.setLS('removeIndex', '')
            }
        })
    }
    setCurrent(source) {
        let current = source.find(route => route.data.link === this.location.pathname)
        this.addItem = Object.assign({}, current.data)
    }
    goHome() {
        this.router.navigate([''])
        // home item
        this.addItem = this.navList[0]
    }
    chooseTag(item) {
        if (this.addItem.key !== item.key) {
            this.router.navigate([item.link], {queryParams: item.params})
        }
    }
    closeTag(item: navList) {
        let i = this.navList.findIndex(nav => nav.key === item.key)
        let current = this.navList[i - 1]
        this.navService.closeTag(this.navList, i)
        if (this.addItem.key === item.key) {
            this.router.navigate([current.link], {queryParams: current.params})
        } else {
            this.left = this.navService.getLeft(this.navList, this.addItem.key)
        }
    }
    move(direction: String) {
        this.left = this.navService.move(direction, this.left)
    }
    closeAll() {
        this.navList.splice(1, this.navList.length - 1)
        this.navService.setLS('nav', this.navList)
        this.goHome()
        this.left = 0
    }
    closeItem() {
        this.navList.splice(1, this.navList.length - 1)
        this.navService.addTag(this.navList, Object.assign({}, this.addItem))
        this.left = 0
    }
    // nav右键
    contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
        this.nzContextMenuService.create($event, menu);
    }
    slide() {
        setTimeout(() => {
            if (this.addItem && this.addItem.key) {
                this.left = this.navService.getLeft(this.navList, this.addItem.key)
            }
        }, 250)
    }
}

