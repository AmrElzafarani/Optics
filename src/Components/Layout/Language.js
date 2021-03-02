import React from 'react';
import { Navbar} from "react-bootstrap";

const Language = (props) => {

    return (
            <Navbar bg="dark" variant="dark" className="align-content-end">
                <select

                    value={props.language}
                    onChange={e => props.handleSetLanguage(e.target.value)}
                >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>


                </select>
            </Navbar>

    )

}

export default Language;