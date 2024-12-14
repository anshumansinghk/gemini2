export interface LibraryFilterMenu{
    data:LibraryFilterMenuData,
    msg:string,
    status:string,
    status_code:number
}

export interface LibraryFilterMenuData{
    filter:Array<FilterSortByData>,
    menu:Array<MenuData>,
    sort_by:Array<FilterSortByData>
}

export interface MenuData{
    id:string,
    is_icon:boolean,
    title:string,
    icon?:string
}

export interface FilterSortByData{
    id:string,
    title:string
}

export interface libraryList{
    data:LibraryListList,
    msg:string,
    status:string,
    status_code:number
}

export interface LibraryListList{
    list:ListData[]
}

export interface ListData{
    created_at:string,
    favorite_date:string,
    file_id:string,
    id:string,
    is_favorite:boolean,
    is_local:string,
    title:string,
    type:string,
    url:string
}