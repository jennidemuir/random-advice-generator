import { createPortal } from "react-dom";
import React, { useRef, useEffect, useCallback } from "react";
import styled from 'styled-components';
import "./Modal.css";

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      console.log(e.target);
      setShowModal(false);
        window.location.reload();
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        window.location.reload();
      }
    },
    [setShowModal, showModal]
  );

  const closeModalXClick = () => {
       setShowModal((prev) => !prev);
       window.location.reload();
  }

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  if (!showModal) {
    return null;
  }

  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomByte = () => randomNumber(0, 255);
  const randomCssRgba = () =>
    `rgba(${[randomByte(), randomByte(), randomByte(), .7].join(
      ","
    )})`;

  const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: ${randomCssRgba };
  `;

  return createPortal(
    <div>
      <Overlay ref={modalRef} onClick={closeModal} className="overlay"></Overlay>
      <div className="modal">
        <div>
          <span
            className="close-button"
            onClick={closeModalXClick}
          >
            X
          </span>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
