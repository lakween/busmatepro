import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import {
    getDocFromCollection,
    updateAuthProfile,
    updateDocument,
    updateProfilePhoto
} from "../../../actions/common.action";

import DisplayLine from "../display-line/display-line";
import firebase from "firebase/compat/app";

const Profile = () => {
    const { currentUser } = getAuth();
    const [photo, setPhoto] = useState("");
    const [model, setModel] = useState({});
    const dispatch = useDispatch();


    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                getLocalProfileData(user?.uid)

            } else {
                // navigate('/')
            }
        });
    }, []);

    const getLocalProfileData = async (uid) => {
        let userData = await getDocFromCollection('userProfile', uid);
        setModel({ ...currentUser, ...userData });
    };

    const onUpdateAuthHandler = async (path, form) => {
        setModel({ ...model, ...currentUser, ...form });
        await updateAuthProfile(currentUser, form);
    };

    const onChangeProfilePicture = async (e) => {
        if (e.target.files[0]) {
            await updateProfilePhoto(e.target.files[0], currentUser);
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    };

    const onUpdateHandler = async (path, form) => {
        setModel({ ...model, ...form });
        await updateDocument('userProfile', currentUser.uid, form);
    };

    return (
        <div className={'p-5'}>
            <div
                className="flex flex-col lg:flex-row w-full p-5 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div>
                    <Avatar
                        size="2xl"
                        src={
                            photo ||
                            model?.photoURL ||
                            "https://www.pngitem.com/middle/mmhwxw_transparent-user-png-default-user-image-png-png"
                        }
                        alignContent="center"
                        justifyContent={"center"}
                    />
                    <div className=" space-y-2 p-3 mt-3 border border-md">
                        <input
                            type={"file"}
                            accept="image/png,image/jpeg"
                            onChange={onChangeProfilePicture}
                        />
                        <DisplayLine
                            modelPath={"fullName"}
                            name={"fullName"}
                            onUpdate={onUpdateHandler}
                            value={model?.fullName ? model?.fullName : "Unknown"}
                        />
                    </div>

                </div>


                <div class="flex w-full flex-col justify-start p-6">
                    <h5
                        class="mb-2 text-xl font-medium text-neutral-800 dark:text-white">
                        Edit Profile Details
                    </h5>
                    <div className="w-full mt-2 mb-2">
                            <p className="mb-0">Full Name</p>
                        <div className="">
                            <DisplayLine
                                modelPath={"fullName"}
                                name={"fullName"}
                                onUpdate={onUpdateHandler}
                                value={model?.fullName ? model?.fullName : "Unknown"}
                            />
                        </div>
                    </div>
                    <hr className="divider-horizontal" />
                    <div className=" mt-2 mb-2">
                        <div className="">
                            <p className="mb-0">Email</p>
                        </div>
                        <div className="">
                            <p className="text-muted mb-0">
                                {model?.email}
                            </p>
                        </div>
                    </div>
                    <hr className="divider-horizontal" />
                    <div className=" mt-2 mb-2">
                        <div className="">
                            <p className="mb-0">Phone</p>
                        </div>
                        <div className="">
                            <DisplayLine
                                modelPath={"mobile_number"}
                                name={"mobile_number"}
                                onUpdate={onUpdateHandler}
                                value={
                                    model?.mobile_number ? model?.mobile_number : "--------"
                                }
                            />
                        </div>
                    </div>
                    <hr className="divider-horizontal" />
                    {/*<div className=" mt-2 mb-2">*/}
                    {/*    <div className="">*/}
                    {/*        <p className="mb-0">Birthday</p>*/}
                    {/*    </div>*/}
                        {/*<div className="">*/}
                        {/*    <DisplayLine*/}
                        {/*        modelPath={"birthday"}*/}
                        {/*        name={"birthday"}*/}
                        {/*        onUpdate={onUpdateHandler}*/}
                        {/*        value={model?.birthday ? model?.birthday : "00-00-0000"}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <hr className="divider-horizontal" />
                    <div className=" mt-2 mb-2">
                        <div className="">
                            <p className="mb-0">Address</p>
                        </div>
                        <div className="">
                            <p className="text-muted mb-0">
                                <DisplayLine
                                    modelPath={"Address"}
                                    name={"Address"}
                                    onUpdate={onUpdateHandler}
                                    value={model?.Address ? model?.Address : ""} />
                            </p>
                        </div>
                    </div>
                    <hr className="divider-horizontal" />
                </div>
            </div>


            {/* <Row>
                    <Col xs="12" md="6">
                        <Card className="mb-2">
                            <Card.Title tag="h6" className="border-bot tom p-3 mb-0">
                                Profile
                            </Card.Title>
                            <Card.Body className="text=center">
                                <Col xs="12" md="6" className="offset-4 mb-4">
                                    <Avatar
                                        size="2xl"
                                        src={
                                            photo ||
                                            model?.photoURL ||
                                            "https://www.pngitem.com/middle/mmhwxw_transparent-user-png-default-user-image-png-png"
                                        }
                                        alignContent="center"
                                        justifyContent={"center"}
                                    />
                                </Col>
                                <Box
                                    borderWidth="1px"
                                    mb={4}
                                    borderColor={useColorModeValue("gray.200", "gray.700")}
                                    padding={5}
                                    bg={useColorModeValue("white", "gray.900")}
                                    width={"100%"}
                                    borderStyle={"solid"}
                                >
                                    <Flex gap={5} direction={"row"} align={"center"}>
                                        <input
                                            type={"file"}
                                            accept="image/png,image/jpeg"
                                            onChange={onChangeProfilePicture}
                                        />
                                    </Flex>
                                    <DisplayLine
                                        modelPath={"fullName"}
                                        name={"fullName"}
                                        onUpdate={onUpdateHandler}
                                        value={model?.fullName ? model?.fullName : "Unknown"}
                                    />
                                </Box>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs="12" md="6">
                        <Card className="mb-2">
                            <Card.Title tag="h6" className="border-bottom p-3 mb-0">
                                Profile Details
                            </Card.Title>
                            <Card.Body className="text=center">
                                <div className="row mt-2 mb-2">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <DisplayLine
                                            modelPath={"fullName"}
                                            name={"fullName"}
                                            onUpdate={onUpdateHandler}
                                            value={model?.fullName ? model?.fullName : "Unknown"}
                                        />
                                    </div>
                                </div>
                                <hr className="divider-horizontal"/>
                                <div className="row mt-2 mb-2">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {model?.email}
                                        </p>
                                    </div>
                                </div>
                                <hr className="divider-horizontal"/>
                                <div className="row mt-2 mb-2">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Phone</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <DisplayLine
                                            modelPath={"mobile_number"}
                                            name={"mobile_number"}
                                            onUpdate={onUpdateHandler}
                                            value={
                                                model?.mobile_number ? model?.mobile_number : "--------"
                                            }
                                        />
                                    </div>
                                </div>
                                <hr className="divider-horizontal"/>
                                <div className="row mt-2 mb-2">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Birthday</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <DisplayLine
                                            modelPath={"birthday"}
                                            name={"birthday"}
                                            onUpdate={onUpdateHandler}
                                            value={model?.birthday ? model?.birthday : "00-00-0000"}
                                        />
                                    </div>
                                </div>
                                <hr className="divider-horizontal"/>
                                <div className="row mt-2 mb-2">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            <DisplayLine
                                                modelPath={"Address"}
                                                name={"Address"}
                                                onUpdate={onUpdateHandler}
                                                value={model?.Address ? model?.Address : ""}/>
                                        </p>
                                    </div>
                                </div>
                                <hr className="divider-horizontal"/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> */}
        </div>
    );
};

export default Profile;
