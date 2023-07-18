import {useEffect, useRef, useState} from "react";
import * as Passwordless from "@passwordlessdev/passwordless-client";
import {BACKEND_URL, PASSWORDLESS_API_KEY, PASSWORDLESS_API_URL} from "../configuration/PasswordlessOptions";
import { ToastContainer, toast } from 'react-toastify';
import YourBackendClient from "../services/YourBackendClient";

export default function RegisterPage() {
    const userRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const aliasRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [alias, setAlias] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);


    useEffect(() => {
        setErrMsg("");
    }, [user]);

    const handleSubmit = async (e) => {
        const p = new Passwordless.Client({
            apiKey: PASSWORDLESS_API_KEY,
            apiUrl: PASSWORDLESS_API_URL
        });

        debugger;
        const yourBackendClient = new YourBackendClient();
        const registerToken = await yourBackendClient.register(user, firstName, lastName, alias);
        const finalResponse = await p.register(registerToken.token, alias);

        // do proper error handling here...
        if (finalResponse) {
            toast(`Registered '${alias}'!`);
        }
    };

    return (
        <>
            <section>
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1>Register</h1>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-describedby="uidnote"
                />
                <label htmlFor="firstname">FirstName:</label>
                <input
                    type="text"
                    id="firstName"
                    ref={firstNameRef}
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    aria-describedby="uidnote"
                />
                <label htmlFor="lastname">LastName:</label>
                <input
                    type="text"
                    id="lastname"
                    ref={lastNameRef}
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    aria-describedby="uidnote"
                />
                <label htmlFor="alias">Alias:</label>
                <input
                    type="text"
                    id="alias"
                    ref={aliasRef}
                    autoComplete="off"
                    onChange={(e) => setAlias(e.target.value)}
                    value={alias}
                    required
                    aria-describedby="uidnote"
                />
                <button onClick={handleSubmit}>Register</button>
                <p>Already registered?</p>
                <ToastContainer />
            </section>
        </>
    );
}