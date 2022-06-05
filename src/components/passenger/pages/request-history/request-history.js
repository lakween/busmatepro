import MUIDataTable from "mui-datatables";
import {createTheme, ThemeProvider, unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';
import {CacheProvider} from "@emotion/react";
import {Box, extendTheme} from '@chakra-ui/react'
import blue from "@mui/material/colors/blue";
import Card from "../../../common/card/card.component";
import {getRequests} from "../../../../actions/request-history.Action";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

let themeMUI = createTheme()



const columns = ["Name", "Company", "City", "State"];

const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];


const RequestHistory = (theme) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getRequests())
    },[])


    return (
        <>
            <Box mt={10}>
                <Card inSideTitle={'In Progress Request'}>
                    <MUIDataTable
                        title={"Employee List"}
                        data={data}
                        columns={columns}/>
                </Card>

            </Box>

        </>

    )
}

export default RequestHistory