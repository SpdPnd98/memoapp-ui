import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useState } from "react";
import { NewMemoboardProps } from "../model/memoboard";

export default function MemoboardDialog (props: NewMemoboardProps) {
    // const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const payload = {
        memoboard_name: name,
    }

    return (
        <Dialog open={props.active === undefined ? false : props.active} 
            onClose={() => props.spawn_dialog(false)} 
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Memoboard</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Memoboard name"
                    fullWidth={true}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {props.update_parent(payload); props.spawn_dialog(false)}}>
                    Create
                </Button>
                <Button onClick={() => {props.spawn_dialog(false); setName("");}}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}