<div className="col-12 grid-margin stretch-card">
  <div className="card">
    <div className="card-body">
      <button
        aria-label="Close"
        className="close"
        data-dismiss="modal"
        type="button"
        onClick={toggle}
      >
        <span aria-hidden={true}>×</span>
      </button>
      <h4 className="card-title">Create Category</h4>

      <p className="card-description"> </p>
      <form className="forms-sample">
        <Form.Group>
          <label>Category Name</label>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Category Name"
            name="name"
            value={fields.name}
            onChange={(event) => handleCategoryInput(event)}
          />
          <div>
            <span
              style={{
                paddingTop: 10,
                fontSize: 12,
                fontWeight: "bold",
              }}
              className="text-danger"
            >
              {errors.name}
            </span>
          </div>
          <div>
            <span
              style={{
                paddingTop: 10,
                fontSize: 12,
                fontWeight: "bold",
              }}
              className="text-danger"
            >
              {errors.name}
            </span>
          </div>
        </Form.Group>
        <Row>
          <Col md={12}>
            <label className="label" style={{ display: "block" }}>
              Product Image
            </label>
            <>
              <Button onClick={handleClick}> Upload Product Images</Button>
              <input
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
                ref={hiddenFileInput}
                accept="image/*"
              />
              <div color="muted">
                You can only upload jpg, jpeg, and png type
              </div>
            </>
            <Row>
              <Col md={3}>
                <div style={{ position: "relative" }}>
                  {image && (
                    <div style={{ position: "relative" }}>
                      <img
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          width: "100%",
                        }}
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          fontSize: "28px",
                        }}
                      >
                        <LoginOutlined
                          style={{ marginRight: "10px" }}
                          onClick={handleRotate}
                        />
                        <DeleteOutlined onClick={handleRemoveImage} />
                      </div>
                    </div>
                  )}

                  {errors.images && (
                    <div className="text-danger" style={{ fontSize: 12 }}>
                      {errors.images}
                    </div>
                  )}
                </div>
              </Col>
              {errors.image && (
                <div className="text-danger" style={{ fontSize: 12 }}>
                  {errors.image}
                </div>
              )}
            </Row>
          </Col>
        </Row>

        <div style={{ float: "right" }}>
          <Button
            className="btn btn-outline-dark btn-sm"
            type="submit"
            loading={saving}
            onClick={handleSubmit}
          >
            Save
          </Button>

          <button onClick={toggle} className="btn btn-outline-dark btn-sm">
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</div>;
