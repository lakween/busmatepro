import {color, Select, Textarea} from "@chakra-ui/react";
import {Rating} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {useState} from "react";
import {FloatingLabel} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const RatingsFeedback = () => {
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
            <div className="flex-row">
                <div>
                    Give rate and FeedBack
                </div>
                <div className={'flex-row mt-2'}>
                    <div style={{width: '20vw'}}>
                        <Select placeholder='Select a bus'>
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select>
                    </div>
                    <div className={'row mt-2 border-1 border-light'}>
                        <div className={'col-4'}>
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
                        </div>
                        <div className={'col-4'}>
                            <Textarea placeholder='Yours feedBack' />
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default RatingsFeedback