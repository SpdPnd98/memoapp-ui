import { MemoboardProps, NewMemoboardProps } from "../model/memoboard";
import { URL } from "../resources/constants";
import MemoboardDialog from "./memoboardDialog";

export default function NewMemoboard (props: NewMemoboardProps) {
    // const [name, setName] = useState<string>("");

    const createMemoboard = (payload: MemoboardProps) => {
        const url= URL + "/v1/memoboards";
        console.log(JSON.stringify(payload));
        fetch(url,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        .then((response: any) => {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Error with creating Memoboard!");
        })
        .then((response: any) => {
            // adding memoboard to parent list of memoboards, then setting it to be current active
            props.update_parent({...payload, id: response.id});
        })
        .catch((e) => {
            console.log(e.data);
        });
    }

    return (
        <MemoboardDialog 
            {...props}
            update_parent={createMemoboard}/>
    )
}