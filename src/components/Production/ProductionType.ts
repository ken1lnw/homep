export interface ProductionType {
    id: number,
    created_at: string,
    item_number: string,
    item_description: string,
    brand: string,
    model: string,
    item_image: {
        id:string,
        path: string
    }[]
}


export interface ProductionImageType {
    id: number,
    created_at: string,
    item_id: string,
    path: string ,

}


