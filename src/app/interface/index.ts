export interface navList {
    key: String,
    name: String
    link: String,
    icon?: String,
    params?: Object
}

export interface media {
    type?: String,
    src?: String
    file?: Blob | File
}