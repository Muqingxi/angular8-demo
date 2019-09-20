export class uploadService{
    constructor() {}
    handleBase64 (file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                let DataURL = reader.result
                resolve({ src: DataURL, file: this.dataURItoBlob(DataURL) })
            }
        })
    }
    handleCompress (file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                let img = new Image()
                img.src = reader.result as string
                img.onload = () => {
                    let canvas = document.createElement('canvas')
                    let ctx = canvas.getContext('2d')
                    canvas.width = img.width
                    canvas.height = img.height
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.fillStyle = 'white'
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    let DataURL = canvas.toDataURL('image/jpeg', 0.8)
                    resolve({ src: DataURL, file: this.dataURItoBlob(DataURL) })
                }
            }
        })
    }
    dataURItoBlob (dataURL) {
        dataURL = dataURL.split(',')
        let data = window.atob(dataURL[1])
        let mime = dataURL[0].match(/:(.*?);/)[1]
        let ia = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i)
        }
        return new Blob([ia], { type: mime })
    }
}