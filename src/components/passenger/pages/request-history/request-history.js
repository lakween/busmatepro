import MUIDataTable from "mui-datatables";
import {createTheme, ThemeProvider, unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';
import {CacheProvider} from "@emotion/react";
import {extendTheme} from '@chakra-ui/react'
import blue from "@mui/material/colors/blue";

let themeMUI = createTheme()

themeMUI = createTheme(themeMUI, {
    palette: {
        ...themeMUI.palette,
        action: {
            focus: "#e6e6e6",
            // other variants
        }
    },
    components: {
        MuiTableBody: {
            styleOverrides: {
                root: {}
            }
        }
    }
});


const columns = ["Name", "Company", "City", "State"];

const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];


const RequestHistory = (theme) => {

    return (
        <>
            <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
        />
        </>

    )
}

export default RequestHistory