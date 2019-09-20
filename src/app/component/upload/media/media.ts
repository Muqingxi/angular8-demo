import { Component, ElementRef, Input, forwardRef } from '@angular/core'
import { uploadService } from '../upload.service'
import { media } from 'src/app/interface/index'
import { DomSanitizer } from "@angular/platform-browser"
import { NzMessageService } from 'ng-zorro-antd/message'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'app-media',
    templateUrl: './media.html',
    styleUrls: ['./media.less'],
    providers: [
        uploadService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => mediaComponent),
            multi: true
        }
    ]
})
export class mediaComponent {
    modal = {
        status: false,
        src: '',
        type: ''
    }
    list: media[] = []
    _accept = ''
    enums
    onChangeCallback: (_: any) => void = function(){}
    onTouchedCallback: () => void = function(){}
    @Input() accept: string
    @Input() size: number = 2

    constructor(private el: ElementRef, private upload: uploadService, private dz: DomSanitizer, private message: NzMessageService) {}
    ngOnInit() {
        this._accept = (this.accept && this.accept.split(',').map(item => `${item}/*`).join(',')) || 'image/*,video/*,audio/*'
        this.enums = { image: '图片', video: '视频', audio: '音频' }
    }
    add() {
        this.el.nativeElement.querySelector('.file').click()
    }
    change(e) {
        let media: media = {}
        let file = e.target.files[0]
        let types = file.type.split('/')
        let type = this.accept.split(',')
        if (this.accept && type.indexOf(types[0]) === -1) {
            this.message.create('warning', `只能上传${type.map(item => this.enums[item]).join(',')}类的文件`)
        } else if (file.size > this.size * 1024 * 1024) {
            this.message.create('warning', `文件大小不能超过${this.size}M`)
        } else {
            media.type = types[0]
            if (types[1] === 'jpeg') {
                this.upload.handleCompress(file).then((data: media) => {
                    this.setMedia(media, data)
                })
            } else if (types[0] === 'image') {
                this.upload.handleBase64(file).then((data: media) => {
                    this.setMedia(media, data)
                })
            } else {
                let data = {
                    src: this.dz.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
                    file
                }
                this.setMedia(media, data)
            }
        }
        // 清空
        e.target.value = ''
    }
    setMedia(source: media, data) {
        source.src = data.src
        source.file = data.file
        this.list.push(source)
    }
    preview(media) {
        this.modal = {status: true, src: media.src, type: media.type}
    }
    close() {
        this.modal = {status: false, src: '', type: ''}
    }
    delete(i: number) {
        this.list.splice(i, 1)
    }
    // ngModel
    writeValue(value: media[]) {
        if (value !== this.list) {
            this.list = value;
        }
    }
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
}

