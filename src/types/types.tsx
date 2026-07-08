
// Products Data
type Product={
        title:string,
        images:string[],
        quantity:number,
        ratingsQuantity:number,
        price:number,
        category:{
          name:string,
        },
        brand:{
          name:string,
        }
        id:string,
        ratingsAverage:number,
    }

export type ProductsData = {
    products:Product[],
    isloading:boolean,
    isError:boolean,
}

// Categories Data

export type CategoriesData ={
    data:{
        name:string,
        _id:string,
    }[],
     brands: {
    name: string;
    _id: string;
  }[];
    isloading:boolean,
    iserror:boolean,
    selectedcategory:string,
    hide:boolean,
    selectedBrand:string,
  
}

// Cart Data 

type Cart ={
        product:{
            title:string,
            _id:string,
            imageCover:string,
            ratingsAverage:number,
            quantity:number,
        }
        _id:string,
        price:number,
        count:number,
        cartId:string,
    }
    
export type CartData ={
    cart:Cart[],
    isloading:boolean,
    isError:boolean,
    cartId:string,
}

// Auth props 
export type authprops = {
     token:string,
    isloading:boolean,
    isError:boolean,
   
}
// Login and Register props
export type RegisterProps ={
     name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}
export type loginProps ={
    email:string,
    password:string,
}
