import { CategoryProps } from "../model/category";
import { URL } from "./constants";

// this can be a class, as we view categories as a resource, not a component
export default class Categories {
    url:string = URL + "/v1/categories";
    categoriesArr:any = this.getCategories();

    getCategories () : any{
        console.log(this.url);
        fetch (this.url)
        .then((response : any) => {
            console.log(response.body);
            if(response.ok) {
                this.categoriesArr = response.json();
                console.log(this.categoriesArr);
                return this.categoriesArr;
            }
            // console.log(response.text());
            throw new Error("Network was not ok.")
        })
    }

   createCategory (payload: CategoryProps) : any {
        fetch (this.url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body :JSON.stringify(payload),
        })
        .then((response : any) => {
            if(response.ok) {
                // console.log(JSON.stringify(response.json()));
                this.categoriesArr = response.json();
                return response.json();
            }
            // console.log(response.text());
            throw new Error("Network was not ok.")
        })
    }

    updateCategory (payload: CategoryProps) : any {
        fetch (this.url + "/" + payload.id, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body :JSON.stringify(payload),
        })
        .then((response : any) => {
            if(response.ok) {
                // console.log(JSON.stringify(response.json()));
                this.categoriesArr = response.json();
                return response.json();
            }
            // console.log(response.text());
            throw new Error("Network was not ok.")
        })
    }

    deleteCategory (payload: CategoryProps) : any {
        fetch (this.url + "/" + payload.id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body :JSON.stringify(payload),
        })
        .then((response : any) => {
            if(response.ok) {
                // console.log(JSON.stringify(response.json()));
                this.categoriesArr = response.json();
                return response.json();
            }
            // console.log(response.text());
            throw new Error("Network was not ok.")
        })
    }
    
}

// export default withStyles((theme: Theme) => styles)(CategoriesComponent);
// export {};