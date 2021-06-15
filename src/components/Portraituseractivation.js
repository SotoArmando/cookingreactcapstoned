import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";

export default function Portraituseractivation(props) {
    let [{ hash }, [activated, setActivated], [error, setError]] = [useParams(), useState(false), useState(false)]
    const CryptoJS = require("crypto-js");
    var decryptedBytes = CryptoJS.AES.decrypt(decodeURIComponent(hash), "764764764");
    var { mail, nick } = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

    const handleuseractivation = () => {
        const { ["user CRUD"]: url } = mealdbkeys
        const { fetchcrudOperation } = fetcher(url, (e) => {
            if (e.hasOwnProperty('error')) {
                setError('Something went wrong, please try refreshing this page')
            } else {
                setActivated(true)
            }
        })
        fetchcrudOperation('POST', JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8)))
    }

    useEffect(() => {
        if (!activated) {
            handleuseractivation();
            setActivated();
        }
    })

    return <div className="col">
        <span>Activate user {mail}</span>
        <span className="wrapanywhere">{[mail, nick]}</span>
        {
            activated ? 'Your account was succesfully activated' : error
        }
        <input className="btn_u" type="button" value="Activate" />
    </div>
}
