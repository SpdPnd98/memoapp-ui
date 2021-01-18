import { Select, FormControl, InputLabel, Input, Chip, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { CategoryProps } from "../model/category";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import { ColorButton } from "material-ui-color";

const styles = makeStyles((theme: Theme) => createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),);

export default function CategoryFilter(props: {categories: CategoryProps[], update_filter: Function}) {

    const [categoriesId, setCategoriesId] = useState<number[]>([]);

    const handleChange = (event: any) => {
        console.log("categories changed!");
        setCategoriesId(event.target.value);
        props.update_filter(event.target.value);
    }

    const classes = styles();
    const theme = useTheme();

    // console.log("category filters have: " + JSON.stringify(props.categories));

    return (

        <div>
            <FormControl className = {classes.formControl}>
                <InputLabel id="multiple-chip-label">filter by...</InputLabel>
                <Select
                    labelId="multiple-chip-label"
                    id="multiple-chip"
                    multiple
                    value = {categoriesId}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {
                            (selected as number[]).map((value) => (
                                <Chip key={value} label={ props.categories.filter(
                                        (category: CategoryProps) => category.id === (value))[0].name} />
                            ))}
                        </div>
                    )}
                >
                    {props.categories.map((category) => (
                        <MenuItem key = {category.name} value={category.id}>
                            <ColorButton color={category.color} />{category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}