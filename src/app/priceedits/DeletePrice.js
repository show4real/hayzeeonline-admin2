import React from "react";
import { Button, Modal } from "reactstrap";

import { deletePrice } from "../services/orderService";
import SpinDiv from "../components/SpinDiv";

class DeletePrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.price,
      loading: false,
      search: "",
      validation: {},
      name: "",
    };
  }

  componentDidMount() {
    // toast.configure({ hideProgressBar: true, closeButton: false });
  }

  onDelete = () => {
    this.setState({ loading: true });
    const { price } = this.state;
    console.log(price);
    deletePrice(price.id).then(
      (res) => {
        console.log(res);
        this.setState({ loading: false });
        this.props.toggle();
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  render() {
    const { price, toggle } = this.props;
    const { loading } = this.state;
    console.log(price);
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={price != null}
          style={{ maxWidth: 600 }}
        >
          {loading && <SpinDiv text={"Deleting..."} />}
          <div className="modal-header" style={{ padding: "1rem" }}>
            <h3 className="modal-title" id="exampleModalLabel">
              Delete price - {price.comment}
            </h3>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={toggle}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body" style={{ border: "1px solid #eee" }}>
            Are you sure you want to delete this price? <br />
            <br />
            This action is irreversible and all data associated with this price
            will be lost permanently!
          </div>
          <div className="modal-footer" style={{ padding: "1rem" }}>
            <Button
              size="sm"
              color="secondary"
              data-dismiss="modal"
              type="button"
              disabled={loading}
              onClick={toggle}
            >
              Cancel
            </Button>
            <Button
              color="success"
              type="button"
              disabled={loading}
              size="sm"
              onClick={this.onDelete}
              style={{
                backgroundColor: "#EC3237",
                borderColor: "#EC3237",
                color: "#fff",
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default DeletePrice;
