import React from "react";
import { Button, Modal } from "reactstrap";
// import { toast } from "react-toastify";

import { deleteReferrer } from "../services/orderService";
import SpinDiv from "../components/SpinDiv";

class DeleteReferrer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referrer: props.referrer,
      loading: false,
      search: "",
      validation: {},
      name: "",
    };
  }

  componentDidMount() {
    // toast.configure({ hideProgressBar: true, closeButton: false });
  }

  // showToast = (msg) => {
  //   toast(<div style={{ padding: 20, color: "green" }}>{msg}</div>);
  // };
  // showToastError = (msg) => {
  //   toast(<div style={{ padding: 20, color: "red" }}>{msg}</div>);
  // };
  onDelete = () => {
    this.setState({ loading: true });
    const { referrer } = this.state;
    console.log(referrer);
    deleteReferrer(referrer.id).then(
      (res) => {
        console.log(res);
        this.setState({ loading: false });
        this.props.saved();
        this.props.toggle();
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  render() {
    const { referrer, toggle } = this.props;
    const { loading } = this.state;
    console.log(referrer);
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={referrer != null}
          toggle={() => !loading && toggle}
          style={{ maxWidth: 600 }}
        >
          {loading && <SpinDiv text={"Deleting..."} />}
          <div className="modal-header" style={{ padding: "1rem" }}>
            <h3 className="modal-title" id="exampleModalLabel">
              Delete referrer - {referrer.name}
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
            Are you sure you want to delete this referrer? <br />
            <br />
            This action is irreversible and all data associated with this
            referrer will be lost permanently!
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

export default DeleteReferrer;
