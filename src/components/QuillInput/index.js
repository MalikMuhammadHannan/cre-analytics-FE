import React, { useCallback, useMemo, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import { useSelector } from "react-redux";
import { UploadFiles } from "../../Axios/AxiosFunctions";
import classes from "./QuillInput.module.css";
import { imageUrl } from "../../config/apiUrl";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

function QuillInput({
  value,
  setter,
  quillClass = "",
  placeholder = "",
  label,
  allowImages = false,
  containerClass,
  quilInputClass,
}) {
  const quillRef = useRef(null);
  const { access_token } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  // upload image to s3
  const uploadImageHandler = async (e) => {
    setLoading(true);
    const res = await UploadFiles([e]);

    if (res !== undefined) {
      return res?.data?.data?.images?.[0];
    }
    setLoading(false);
  };
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        // Use your function to upload the image and get the URL
        const image = await uploadImageHandler(file);
        if (image) {
          let url = imageUrl(image);
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", url);
          setLoading(false);
        }
      }
    };
  }, []);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "link"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          allowImages ? ["link", "image"] : [],
          ["clean"],
          [
            {
              align: [],
            },
          ],
        ]?.filter((ele) => ele.length > 0),
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        // Optionally include options here
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    [imageHandler]
  );
  return (
    <div className={containerClass && containerClass}>
      <style>{`
      .ql-disabled{
         background-color:var(--disabled-input-color);
      }
      .ql-snow{
        }
         .ql-picker-options{
        //  background-color:var(--main-color) !important;

         }
          .ql-stroke{
          stroke:var(--secondary-color) !important

         }
         .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill{
          fill:var(--secondary-color) !important

         }
         .ql-snow .ql-picker{
          color:var(--secondary-color) !important
         }
         .ql-picker-item:hover{
          color:inherit !important;
         }
         .ql-editor.ql-blank::before{
          color:var(--white-color);
          font-style:normal;
         }
         .ql-editor{
            min-height: inherit;  
            max-height:inherit;
            // overflow-y: auto;
         }
        .ql-editor a{
          color:var(--secondary-color) !important;
          text-decoration:underline !important;
          }
         .ql-clipboard {
          opacity: 0 !important;
         }
      `}</style>
      {label && <label className={classes.label}>{label}</label>}
      <div className={loading && classes.loaderDiv}>
        <div
          className={[quilInputClass, classes.quillInput].join(" ")}
          data-variant="bordered"
        >
          <ReactQuill
            className={`${classes.quill} ${quillClass}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setter(e)}
            modules={modules}
            ref={quillRef}
          />
        </div>
        {loading && (
          <div className={classes.loader}>
            <Spinner animation="border" variant="white" />
          </div>
        )}
      </div>
      {/* <div className={[classes.quillInput].join(" ")} data-variant={variant}>
        <ReactQuill
          className={`${classes.quill} ${quillClass}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setter(e)}
          modules={modules}
        />
      </div> */}
    </div>
  );
}

export default QuillInput;
