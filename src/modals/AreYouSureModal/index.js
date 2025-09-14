import { Button } from "@/components/Core/Button";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import classes from "./AreYouSureModal.module.css";

const AreYouSureModal = ({
  show,
  setShow,
  title = "Are You Sure You Want To Delete ",
  subTitle = "Once you delete this can’t be recovered",
  onClick,
  isApiCall,
}) => {
  return (
    <>
      <style>{`
        .modal-content {
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background-color:var(--section-background);
        }
          [data-theme="dark"] .modal-content {
            border: 1px solid var(--main-color) !important;
          }
        .modal-body {
          padding: 40px 32px;
          height:auto;
          background-color: var(--section-background);
        }
        .modal-header {
          flex-direction: column;
          background: var(--main-color);
          border-bottom: none;
          justify-content: center !important;
          padding: 0.75rem;~
        }
        .name {
          font-size: 18px;
          color: var(--text-color-black);
        }
      `}</style>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body>
          <div className={classes.content}>
            <div className={classes.mainDiv}>
              <p className={classes.title}>{title}</p>
              <p className={[classes.message].join(" ")}>{subTitle}</p>
            </div>
            <div className={classes.iconBox} onClick={() => setShow(false)}>
              <AiOutlineClose size={20} color={"var(--secondary-color)"} />
            </div>
            <div className={classes.btnsBox}>
              <Button
                className={classes.yesBtn}
                onClick={onClick}
                variant={"tertiary"}
                disabled={isApiCall}
              >
                {isApiCall ? "Processing" : "Yes"}
              </Button>
              <Button
                className={classes.noBtn}
                onClick={async () => {
                  setShow(false);
                }}
                disabled={isApiCall}
              >
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AreYouSureModal;
