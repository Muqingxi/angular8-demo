# start
```
npm i
npm run dev
```

# usage
- router subscribe
```javascript
import {filter, map} from 'rxjs/operators'

this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.router)
).subscribe(() => {
    this.route.queryParams.subscribe((params: Params) => {
        let data = getData(this.router.routerState, this.router.routerState.root)
    })
})
```
- component [(ngModel)]
```javascript
import { forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => childComponent),
            multi: true
    }]
})
export class childComponent {
    value
    onChangeCallback: (_: any) => void = function(){}
    onTouchedCallback: () => void = function(){}

    // 初始化的时候调用,会使用表单模型中对应的初始值作为参数（也就是ngModel里的值）   
    writeValue(value: any) {
        if (value !== this.value) {
            this.value = value;
        }
    }
    // 用来通知外部,组件已经发生变化
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    // 设置当控件接收到 touched 事件后,调用的函数
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
}
```
- trust url
```javascript
import { DomSanitizer } from "@angular/platform-browser"

export class childComponent {
    url = 'http://www.baidu.com'
    constructor(private dz: DomSanitizer) {}
    ngOnInit() {
        this.url = this.dz.bypassSecurityTrustUrl(this.url)
    }
}
```