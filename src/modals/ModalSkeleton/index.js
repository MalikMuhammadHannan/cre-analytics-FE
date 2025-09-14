"use client";

import { Modal } from "react-bootstrap";
import classes from "./modalSkeleton.module.css";
import { AiOutlineClose } from "react-icons/ai";

export default function ModalSkeleton({
  show,
  setShow,
  header,
  footer,
  children,
  modalClass,
  hideHeaderBorder,
  headerStyles,
  footerStyles,
  borderRadius,
  showCloseIcon,
  width,
  borderLine = true,
  headerClass,
  className,
  center,
  noPadding,
}) {
  function handleClose() {
    setShow(false);
  }
  return (
    <>
      <style>{`
       
        .modal-dialog-centered {
          height: 100% !important;
        }
        .modal-header {
          border-bottom: none !important;
        }
        .modal-header {
          border-bottom: ${
            hideHeaderBorder ? "none" : `1px solid var(--main-color-yellow)`
          };
        }
        .modal-footer {
          margin: 0px;
          display: unset;
          justify-content: unset;
          align-items: unset;
          padding: ${!borderLine ? "15px 30px" : "0px"};
        }
        .${classes.header} button {
          color: var(--black-color) !important;
        }
        .modal-content {
          margin: ${true ? `0 auto 0 auto` : `0 0 0 auto`};
          padding: ${noPadding ? 0 : `25px`};
          backdrop-filter: blur(10px);
          border-radius: ${borderRadius ? borderRadius : `10px`};
          border: 1px solid var(--border-color);
        }
        .modal-body{
          height:auto !important;
        }
        .modal .modal-dialog {
          max-width: ${width};
          margin: ${true ? `0 auto 0 auto` : `0 0 0 auto`};
        }
       
        @media screen and (max-width: 992px) {
          .modal .modal-dialog {
            max-width: 70%;
          }
        }
        @media screen and (max-width: 768px) {
          .modal .modal-dialog {
            max-width: 80%;
          }
        }
        @media screen and (max-width: 575px) {
          .modal .modal-dialog {
            max-width: 90%;
          }
        }
      `}</style>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={`  ${[classes.modal].join(" ")} `}
      >
        {header && (
          <Modal.Header
            // closeButton
            className={`${[classes.header, headerClass && headerClass].join(
              " "
            )}`}
            style={{ ...headerStyles }}
          >
            <h6>{header}</h6>
          </Modal.Header>
        )}
        {showCloseIcon && (
          <div className={classes.iconBox} onClick={handleClose}>
            <AiOutlineClose size={16} />
          </div>
        )}
        <Modal.Body
          className={`${[classes.body, modalClass && modalClass].join(" ")}`}
        >
          {children}
        </Modal.Body>
        {footer && (
          <Modal.Footer
            className={`${[classes.footer].join(" ")}`}
            style={{
              //   borderTop: `1px solid ${Colors.neutralShadesOfGainsboro}`,
              ...footerStyles,
            }}
          >
            <div>{footer}</div>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
