import {Button, color, Select, Textarea} from "@chakra-ui/react";
import {Rating} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {useEffect, useState} from "react";
import {getAllDocFromCollection, getDocFromCollection} from "../../../../actions/common.action";

const RatingsFeedback = () => {

    const [busList, setBusList] = useState([]);
    const [selectedBus, setSelectedBus] = useState();

    useEffect(() => {
        getbuslist()
    }, [])

    const onChangeBusSelection = (e) => {
        setSelectedBus(e?.target?.value)
    }

    async function getbuslist() {
        let result = await getAllDocFromCollection('bus')
        setBusList(result)
    }

    const RouteName = ({routeID}) => {
        const [route, setRoute] = useState()
        useEffect(() => {
            getRoute()
        }, [])

        const getRoute = async () => {
            let result = await getDocFromCollection('bus routs', 'SZFDerpHXuK1VWEP3rZZ')
            setRoute(result?.name)
        }

        return (
            <>{route}</>
        )
    }

    return (
        <>
            <div className="flex-row">
                <div>
                    Give rate and FeedBack
                </div>
                <div className={'flex-row mt-2'}>
                    <div style={{width: '20vw'}}>
                        <Select onChange={onChangeBusSelection} placeholder='Select a bus'>
                            {busList.map((item, index) => (
                                <option key={index} value={item?.id}>{item?.bus_no}</option>
                            ))}
                        </Select>
                    </div>
                    {
                        selectedBus && (
                            <div className={'row mt-2 border-1 border-light'}>
                                <div className={'col-2'}>
                                    <div className={'row'}>
                                        <text>Bus NO:</text>
                                    </div>
                                    <div className={'row'}>
                                        <text>{busList?.filter((item) => (item.id == selectedBus))[0]?.bus_no}</text>
                                    </div>
                                </div>
                                <div className={'col-2'}>
                                    <div className={'row'}>
                                        <text>Route:</text>
                                    </div>
                                    <div className={'row'}>
                                        <text><RouteName
                                            routeID={busList?.filter((item) => (item.id == selectedBus))[0]?.route_id}/>
                                        </text>
                                    </div>
                                </div>
                                <div className={'col-4'}>
                                    <RatingStar/>
                                </div>
                                <div className={'col-4'}>
                                    <Textarea placeholder='Yours feedBack'/>
                                </div>
                                <div className={'row'}>
                                    <div>
                                        <Button colorScheme='teal' size='sm'>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

const RatingStar = () => {
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);

    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <>
            <Rating
                name="simple-controlled"
                value={value}
                // precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
            />
            {value !== null && (
                <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </>
    )
}

export default RatingsFeedback