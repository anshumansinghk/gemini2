// Libraray filter menu   ----------------------------------------

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

// Library list -------------------------------------------------

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
    title:string | null | undefined,
    type:string,
    url:string
}

// Library contant-----------------------------------------------

export interface LibrarayContent{
    data:LibrarayContentData,
    msg:string,
    status:string,
    status_code:number
}

export interface LibrarayContentData{
    cotnent:LibrarayContentDataDetail[],
    content:any 
}

export interface LibrarayContentDataDetail{
    categories:LibrarayContentDataDetailCategories[],
    created_at:string,
    file_id:string,
    id:string,
    is_local:string,
    title:string|null,
    type:string,
    url:string|null|URL|undefined,
    url_source:string|null,
    preId?:any
}

export interface LibrarayContentDataDetailCategories{
    category_id:string,
    resource_id:string,
    title:string|null
}

// Library Favoirate  ---------------------------------------

export interface LibraryFavorite{
    data:LibraryFavoriteData,
    msg:string,
    status:string,
    status_code:number
}

export interface LibraryFavoriteData{
    data:LibraryFavoriteDataData
}

export interface LibraryFavoriteDataData{
    favorite:boolean
}