import React, { useState } from 'react';
import DisplayLyrics from './displayLyricsComponent';
import { Modal } from 'react-bootstrap';
import Audio from './audioComponent';
import './modal.css';

function LyricsModal(props) {
    const [lgShow, setLgShow] = useState(true);

    return (
        <>
            <Modal
                showModal={() => setLgShow(true)}
                size="lg"
                show={lgShow}
                onHide={() => {
                    props.handleCallBack();
                    setLgShow(false);
                    console.log("hide");

                }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <h3>Select the sections you want to send:</h3>
                                <h5>Artist: {props.songObj[props.songObjIndex].name}</h5>   
                                <h5>Title: {props.songObj[props.songObjIndex].title}</h5>
                                {props.preview[props.songObjIndex] !== "" ? (
                                    <Audio preview={props.preview[props.songObjIndex]} />
                                ) : (
                                        <h6> Preview not available for {props.songObj[props.songObjIndex].title} </h6>
                                    )}
                            </div>

                            <div class="col-md-4">
                                <img class="img-fluid" src={props.songObj[props.songObjIndex].albumArt} alt="" ></img>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DisplayLyrics handleCallBack={props.handleCallBack.bind(this)} songData={props.songObj[props.songObjIndex]} uniqueLyricData={props.uniqueLyricData} allLyricData={props.allLyricData} />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default LyricsModal;