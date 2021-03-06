import { NewCategoryProps } from "../model/category";
import CategoryForm from "./categoryForm";
import { URL } from "../resources/constants";

export default function NewCategory(props: NewCategoryProps) {
    
    const createCategory = (payload: any) => {
        const url = URL + "/v1/categories";
        fetch (url, {
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
                return response.json();
            }
            // console.log(response.text());
            throw new Error("Network was not ok.")
        })
        .then((response: any) => {
            
            props.update_categories(response);
            closeForm();
        })
        .catch(()=> {console.log("seems to be problems creating categories...")})
    }

    const closeForm = () => {
        props.update_parent(false);
    }

    return ( // update parent passed in is to remove the form.
        <CategoryForm 
            name={""}
            color={"#FFFFFF"}
            update_category={createCategory}
            update_parent={props.update_parent}
            close_form={closeForm} />
    )
}