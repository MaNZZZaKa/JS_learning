export interface IProduct {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: Array<string> // [string] string[]
}

// const f = <F> (arr: Array<F>): Array<F> => arr.slice(arr.length / 2)
// // Array<T> s, n, {}, 

// const result =  f([{}, {}, {} ])