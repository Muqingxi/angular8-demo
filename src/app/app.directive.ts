import { Directive, ElementRef, HostListener, Input, ChangeDetectorRef } from '@angular/core'
import { NgModel }   from '@angular/forms'  

@Directive({
    selector: '[appNumber]',
    host: {
        '(input)': 'onInput($event)'
    },
    inputs: ['appNumber']
})
export class numberDirective {
    private appNumber
    private rexp
    constructor(public control: NgModel, private el: ElementRef) { }
    ngOnInit() { 
        this.rexp = new RegExp(this.appNumber || '^([1-9]\\d*)$')
    }
    onInput(e) {
        let value = this.control.model
        if (e.data && !this.rexp.test(e.data)) {
            this.el.nativeElement.value = value
            this.control.viewToModelUpdate(value)
        }
    }
}
    
@Directive({
    selector: '[appMoney]',
    inputs: ['appMoney']
})
export class moneyDirective {
    private appMoney
    private n1
    private n2
    private rexp1
    private rexp2
    constructor(public control: NgModel, private el: ElementRef) { }
    ngOnInit() { 
        this.n1 = (this.appMoney || [])[0] || 9
        this.n2 = (this.appMoney || [])[1] || 2
        this.rexp1 = new RegExp(`^(0|[1-9]\\d{0,${this.n1 - 1}})(\\.\\d{0,${this.n2}})?$`)
        this.rexp2 = new RegExp(`^9{${this.n1}}\\.$`)
    }
    @HostListener('input') onInput() {
        let value = this.control.model
        let newValue = this.el.nativeElement.value
        if (newValue && (!(this.rexp1.test(newValue)) || this.rexp2.test(newValue))) {
            this.el.nativeElement.value = value
            this.control.viewToModelUpdate(value)
        }
    }
}
    
@Directive({
    selector: '[appThousands]',
    inputs: ['appThousands']
})
export class thousandsDirective {
    private appThousands
    constructor(public control: NgModel, private el: ElementRef, private cd: ChangeDetectorRef) { }
    format = () => {
        let val = this.control.viewModel.replace(/,/g, '')
        let valFormat = (val && val.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')) || ''
        setTimeout(() => {
            this.el.nativeElement.value = valFormat
        })
        this.control.viewToModelUpdate(this.appThousands === 'number' ? val : valFormat)
    }
    ngAfterViewInit() {
        this.format()
        /*
        * 如果需要viewToModelUpdate(valFormat)
        * 添加this.cd.detectChanges()强制更新
        */
    }
    @HostListener('input') onInput() {
        this.format()
    }
}