import React from 'react';
import {Button, Modal} from "react-bootstrap";

const myModal = (props) => (
    <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
            <Modal.Title>Tweet Statistics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
    </Modal>
);

export default myModal;