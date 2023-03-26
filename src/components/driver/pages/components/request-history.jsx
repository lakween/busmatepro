import {Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

const RequestHistory = () => {
    return (
        <div className={'flex w-full bg-amber-50 border border-sky-400 flex-row bg-white'}>
            <div className={'text-center'}>
                Request List
            </div>

            <div className="flex overflow-x-auto shadow-md sm:rounded-lg w-full">
                <Box mt={10} maxH={'100vh'}>
                    <TableContainer>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Bus No</Th>
                                    <Th>Route</Th>
                                    <Th>PickUp Holt</Th>
                                    <Th>Status</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>kjdsfn</Td>
                                    <Td>asdasd</Td>
                                    <Td>kjdsfn</Td>
                                    <Td>asdasd</Td>
                                    <Td>kjdsfn</Td>
                                </Tr></Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        </div>
    )
}

export default RequestHistory