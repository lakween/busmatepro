import MUIDataTable from "mui-datatables";
import {createTheme, ThemeProvider, unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {CacheProvider} from "@emotion/react";
import {Box, extendTheme} from '@chakra-ui/react'
import blue from "@mui/material/colors/blue";
import Card from "../../../common/card/card.component";
import {getRequests} from "../../../../actions/request-history.Action";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {columns, options} from "./components/column,";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {filterDocsFromCollection, getDocFromCollection} from "../../../../actions/common.action";

let themeMUI = createTheme()


const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];


const RequestHistory = (theme) => {
    const dispatch = useDispatch()
    const [requests, setRequest] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const {currentUser} = getAuth()
        let requests = await filterDocsFromCollection('user requests', '', [['user_id', '==', currentUser?.uid]])
        setRequest(requests)
    }

    const BusNOCell = ({busID}) => {
        const [state, setState] = useState({})
        useEffect(() => {
            getBusDetails()
        }, [])
        const getBusDetails = async () => {
            let result = await getDocFromCollection('bus', busID)
            let routeName = await getDocFromCollection('bus routs', result?.route_id)
            setState({...result, routeName: routeName?.name})

        }

        console.log(state)
        return (
            <>
                <Td>{state?.bus_no}</Td>
                <Td>{state?.routeName}</Td>
            </>
        )
    }

    return (
        <>
            <Box mt={10} maxH={'100vh'}>
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Bus No</Th>
                                <Th>Route</Th>
                                <Th>PickUp Holt</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requests.map((item) => (
                                <Tr>
                                    <BusNOCell busID={item?.bus_id}/>
                                    <Td>{item?.pickUp_holt}</Td>
                                    <Td>{item?.status}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>

    )
}

export default RequestHistory