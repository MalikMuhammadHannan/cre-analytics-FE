import React from "react";
import classes from "./ProductFilters.module.css";
import Drawer from "react-modern-drawer";
import { Accordion } from "react-bootstrap";
import { Checkbox } from "../Core/Checkbox";
import { FaCheck } from "react-icons/fa6";
import { Button } from "../Core/Button";

const ProductFilters = ({
  open,
  setOpen,
  filterOptions,
  filter,
  setFilter,
  getProducts,
  modalLoading,
}) => {
  const { brands, filters } = filterOptions;
  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <style>{`
        .drawerContainer{
          width:400px !important;
          background-color:transparent !important;
        }
        @media (max-width:768px){
          .drawerContainer{
            width:290px !important;
          }
        }
    `}</style>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        direction="right"
        className="drawerContainer"
      >
        <div className={classes.productFilters}>
          <div className={classes.header}>
            <h2>Filters</h2>
          </div>
          <div className={classes.filtersContainer}>
            <div className={classes.brandContainer}>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className={classes.filterHeader}>
                    Brand
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={classes.checkboxContainer}>
                      {brands?.map((brand, index) => (
                        <div className={classes.checboxDiv}>
                          <div className={classes.leftCheck}>
                            <span
                              className={[
                                classes.checkbox,
                                filter?.brand === brand?.value
                                  ? classes.checked
                                  : "",
                              ].join(" ")}
                              onClick={() => {
                                if (filter?.brand === brand?.value) {
                                  const { brand, ...rest } = filter;
                                  setFilter(rest);
                                } else {
                                  setFilter({ ...filter, brand: brand?.value });
                                }
                              }}
                            >
                              <FaCheck color="white" size={13} />
                            </span>
                            <span className={classes.label}>
                              {brand?.value}
                            </span>
                          </div>
                          <div className={classes.rightCheck}>
                            ({brand?.count})
                          </div>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className={classes.attributesContainer}>
              {filters?.map(({ values, originalName, key }, index) => {
                return (
                  <Accordion>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header className={classes.filterHeader}>
                        {originalName}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className={classes.checkboxContainer}>
                          {values?.map((ele, index) => (
                            <div className={classes.checboxDiv}>
                              <div className={classes.leftCheck}>
                                <span
                                  className={[
                                    classes.checkbox,
                                    filter?.customAttributes?.[key] === ele?.value
                                      ? classes.checked
                                      : "",
                                  ].join(" ")}
                                  onClick={() => {
                                    if (filter?.customAttributes?.[key] === ele?.value) {
                                      const { [key]: removeKey, ...rest } =
                                        filter?.customAttributes;
                                      setFilter({
                                        ...filter,
                                        customAttributes: rest,
                                      });
                                    } else {
                                      setFilter((prev) => {
                                        return {
                                          ...prev,
                                          customAttributes: {
                                            ...prev?.customAttributes,
                                            [key]: ele?.value,
                                          },
                                        };
                                      });
                                    }
                                  }}
                                >
                                  <FaCheck color="white" size={13} />
                                </span>
                                <span className={classes.label}>
                                  {ele?.value}
                                </span>
                              </div>
                              <div className={classes.rightCheck}>
                                ({ele?.count})
                              </div>
                            </div>
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                );
              })}
            </div>
          </div>
          <div className={classes.actionBtns}>
            <Button
              label={modalLoading === "apply" ? "Wait..." : "Filter"}
              onClick={() => {
                getProducts(filter);
              }}
              disabled={modalLoading}
            />
            <Button
              label={modalLoading === "clear" ? "Clearing..." : "Clear"}
              variant="grey"
              onClick={() => {
                setFilter({});
                getProducts({});
              }}
              disabled={modalLoading}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ProductFilters;
