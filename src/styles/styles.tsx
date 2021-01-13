import {makeStyles, Theme } from "@material-ui/core/styles";
// import { WithStyles } from "@material-ui/core";

export const styles = (theme:Theme) => makeStyles({
    root: {
        maxWidth: 280,
    },
    button: {
        maxWidth: 200
    },
    grid: {
        margin: 20,
    },
});