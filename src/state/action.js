import actionTypes from "./actionTypes";
import {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} from "mongodb-stitch-browser-sdk";

var client;

if (!Stitch.hasAppClient("app-kxkzz")){
    client = Stitch.initializeDefaultAppClient("app-kxkzz");
} else {
    client = Stitch.getAppClient("app-kxkzz");
}

export function addName() {
    const db = client
    .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
    .db("app");

    return async (dispatch, getState) => {
        const value = getState().value;
        
        dispatch({
            type: actionTypes.SET_LOAD
        });
        let user = await client.auth.loginWithCredential(new AnonymousCredential());
        let result = await db
        .collection("title")
        .updateOne(
            {"id": "1"},
            {$set: { "name": value}}
        );

        dispatch({
            type: actionTypes.ADD_NAME,
            payload: value
        });
    }
}


export function setName() {
    const db = client
    .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
    .db("app");

    return async (dispatch) => {
        dispatch({
            type: actionTypes.SET_LOAD
        });

        let user = await client.auth.loginWithCredential(new AnonymousCredential());
        let result = await db
        .collection("title")
        .findOne({"id": "1"})

        dispatch({
            type: actionTypes.SET_NAME,
            payload: result.name
        });
    }
}

export function deleteThing(){
    const db = client
    .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
    .db("app");

    return async (dispatch) => {
        dispatch({
            type: actionTypes.SET_LOAD
        });
        let user = await client.auth.loginWithCredential(new AnonymousCredential());
        let result = await db
        .collection("title")
        .updateOne(
            { "id": "1"},
            { $set: { "name": ""}}
        );

        dispatch({
            type: actionTypes.ON_RESET,
        });
    }
}

export function onReset(){
    return(dispatch, getState) => {
       if(getState().description.item){
           return dispatch(deleteThing())
       }
    }
}

export function setLoad(){
    return{
        type: actionTypes.SET_LOAD
    };
}

export function handleChange(value){
    return{
        type: actionTypes.HANDLE_CHANGE,
        payload: value
    };
}



