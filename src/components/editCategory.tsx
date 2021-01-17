import { useState } from "react";
import { EditCategoryProps } from "../model/category";
import CategoryForm from "./categoryForm";
import { URL } from "../resources/constants";

export default function EditCategory (props: EditCategoryProps) {    
    const updateCategory = (payload: any) => {
        const url = URL + "/v1/categories";
        fetch (url + "/" + payload.id, {
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
                return response.json()
            }
            // console.log(response.text());
            throw new Error("Network was not ok.")
        })
        .then((response: any) => {
            props.update_categories(response);
            closeForm();
        })
        .catch(() => console.log("Error in updating categories"));
    }

    const closeForm = () => {
        props.update_parent(false);
    }

    return (
        <CategoryForm
            id={props.id}
            name={props.name}
            color={props.color}

            update_parent={updateCategory}
            close_form={closeForm}
        ></CategoryForm>
    );
}