export interface NewsType {
    id: number,
    created_at: string,
    news_title: string,
    news_description: string,
    news_title_th: string,
    news_description_th: string,
    news_image: {
        id:string,
        path: string
    }[]
}


export interface NewsImageType {
    id: number,
    created_at: string,
    news_id: string,
    path: string ,

}


