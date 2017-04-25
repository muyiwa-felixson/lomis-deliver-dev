import React, { Component, PropTypes } from 'react';
import { Row, Col, Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class NewImport extends Component {
  state = { showModal: false };

  open = () => {
    this.setState({ showModal: this.props.openModal });
  };
  close = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div id="import-modal">
        <Modal show={this.props.openModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Data Importer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select state</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
            <FormGroup >
              <ControlLabel>Sheet ID</ControlLabel>
              <FormControl type="text" placeholder="google sheet ID" />
              <FormControl.Feedback />
            </FormGroup>
            <Row>
              <Col sm={6}>
                <FormGroup >
                  <ControlLabel>Start Date</ControlLabel>
                  <FormControl type="date" />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup >
                  <ControlLabel>End Date</ControlLabel>
                  <FormControl type="date" />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup >
              <ControlLabel>Round Code</ControlLabel>
              <FormControl type="text" placeholder="round code" />
              <FormControl.Feedback />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <div className="general">
              <Button className="radius-secondary" bsStyle="default" onClick={this.close}>Close</Button>
              <Button className="radius-secondary" bsStyle="success">Run import</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

NewImport.propTypes = {
  openModal: PropTypes.bool,
};

export default NewImport;
