// export interface ProductionType {
//     id: number,
//     created_at: string,
//     item_number: string,
//     item_description: string,
//     brand: string,
//     model: string,
//     item_image: {
//         id:string,
//         path: string
//     }[]
// }

export interface ProductionType {
    id: number,
    created_at: string,
    oem_no: string,
    material_no: string,
    full_specifications: string,
    vehicle_brand: string,

    vehicle_model: string,  
    left_right: string,
    product_brand: string,
    vehicle_brand_full: string,
    vehicle_model_full: string,
    vehicle_year: string,
    product_type: string,

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


