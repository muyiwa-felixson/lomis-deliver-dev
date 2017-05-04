import React, { Component, PropTypes } from 'react';
import { Row, Col, Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { ImportPop } from 'components';
import Select from 'react-select';
import helper from 'helpers/round';
import { fetchImportedRound, fetchRoundCount, runImport } from 'redux/actions/roundActions';

const roundTypeOptions = [
  { value: 'Bi-Weekly', label: 'Bi-Weekly' },
  { value: 'Monthly', label: 'Monthly' },
];

class Sidebar extends Component {
  state = {
    showModal: false,
    roundCode: '',
    location: '',
    roundType: '',
    startDate: '',
    endDate: '',
    roundNumber: '',
    sheetId: '',
    validUrl: null,
    status: '',
  };

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }


  handleLocationChange = (val) => {
    this.setState({
      location: val,
    });
  }

  handleTypeChange = (val) => {
    this.setState({
      roundType: val,
    });
  }

  handleSheetIdChange = (val) => {
    this.setState({
      sheetId: val.target.value,
    });
  }

  urlCheck = (e) => {
    const check = helper.isValidURL(e.target.value);
    if (check) {
      this.setState({ validUrl: null });
    } else {
      this.setState({ validUrl: 'error' });
    }
  }

  handleRoundNumberChange = (val) => {
    this.setState({
      roundNumber: val.target.value,
    });
  }

  handleStartDateChange = (val) => {
    this.setState({
      startDate: val.target.value,
    });
  }

  handleEndDateChange = (val) => {
    this.setState({
      endDate: val.target.value,
    });
  }

  handleImport = (e) => {
    e.preventDefault();
    this.setState({ showModal: false });
    const { state, sheetId, startDate, endDate, roundNumber, roundType } = e.target;
    const importObject = {
      state: state.value,
      sheetId: ((sheetId.value).match('/spreadsheets/d/([a-zA-Z0-9-_]+)/'))[1],
      startDate: startDate.value,
      endDate: endDate.value,
      roundNumber: roundNumber.value,
      roundType: roundType.value,
    };

    this.props.runImport(importObject)
      .then((res) => {
        toastr.info(res.message, { timeOut: 3000 });
        this.setState({ roundCode: res.roundCode, status: 'running' });
        setTimeout(() => {
          toastr.success('Completed Data Import!', { timeOut: 3000 });
          this.setState({ status: 'complete' });
          this.props.fetchImportedRound(res.roundCode);
          this.props.fetchRoundCount(res.roundCode);
        }, 120000);
      })
      .catch((err) => {
        toastr.error(err);
      });
  }

  render() {
    const importCheck = this.props.roundObj && this.props.roundObj.importLoading;
    const buttonStyle = (this.state.location === '' || this.state.location === null || this.state.roundNumber === '' || this.state.roundNumber === '0' || this.state.startDate === '' || this.state.endDate === '' || this.state.sheetId === '' || this.state.roundType === '' || this.state.roundType === null) ? ' disabled' : '';
    const opt = this.props.locationsObj !== undefined ?
    this.props.locationsObj.locations.map((location) => {
      const obj = {};
      obj.value = location.key;
      obj.label = location.key;

      return obj;
    }) : '';
    return (
      <div id="sidebar-wrapper">
        <div className="menu-button" >
          <div className="btn btn-link radius-secondary bk_trans margin-menu-button" id="menu-toggle" data-toggle="tooltip" data-container="body" data-placement="right" title="Expand Menu">
            <i className="icon icon-menu" />
          </div>
        </div>
        <ul className="sidebar-nav">
          <li>
            <a className="menu-linker">
              <i className="icon icon-home" data-toggle="tooltip" data-container="body" data-placement="right" title="Home" />
              Home
            </a>
          </li>
          <li>
            <a className="menu-linker">
              <i className="icon icon-barchart" data-toggle="tooltip" data-container="body" data-placement="right" title="Report" />
              Reports
            </a>
          </li>
          <li>
            <a href="#" className="menu-linker" // eslint-disable-line
              onClick={this.open}
            >
              <i className="icon icon-sync" data-toggle="tooltip" data-container="body" data-placement="right" title="Imports" />
              Imports
            </a>
          </li>
        </ul>
        <div id="import-modal">
          <Modal
            show={this.state.showModal}
            onHide={this.close}
            autoFocus
            animation
          >
            <Modal.Header>
              <Modal.Title>Data Importer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form acceptCharset="UTF-8" role="form" onSubmit={this.handleImport}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select</ControlLabel>
                  <Select name="state" placeholder="Select State..." simpleValue options={opt} value={this.state.location} onChange={this.handleLocationChange} />
                </FormGroup>
                <FormGroup validationState={this.state.validUrl} >
                  <ControlLabel>Sheet URL</ControlLabel>
                  <FormControl type="text" name="sheetId" placeholder="Enter Google sheet URL" onBlur={this.urlCheck} value={this.state.sheetId} onChange={this.handleSheetIdChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <Row>
                  <Col sm={6}>
                    <FormGroup >
                      <ControlLabel>Start Date</ControlLabel>
                      <FormControl type="date" name="startDate" value={this.state.startDate} onChange={this.handleStartDateChange} />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup >
                      <ControlLabel>End Date</ControlLabel>
                      <FormControl type="date" name="endDate" value={this.state.endDate} onChange={this.handleEndDateChange} />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <FormGroup >
                      <ControlLabel>Round Number</ControlLabel>
                      <FormControl type="text" placeholder="Enter the Round code" name="roundNumber" value={this.state.roundNumber} onChange={this.handleRoundNumberChange} />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup >
                      <ControlLabel>Round Type</ControlLabel>
                      <Select name="roundType" placeholder="Select Round Type..." simpleValue options={roundTypeOptions} value={this.state.roundType} onChange={this.handleTypeChange} />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <div className="general">
                  <Button type="submit" className={`radius-secondary${buttonStyle}`} bsStyle="success">Run import</Button>
                  <Button className="radius-secondary modal_cancel_btn" bsStyle="default" onClick={this.close}>Close</Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
        { importCheck ? <ImportPop status={this.state.status} /> : '' }
      </div>
    );
  }
}

Sidebar.propTypes = {
  roundObj: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  locationsObj: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchImportedRound: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchRoundCount: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  runImport: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  user: state.user,
  roundObj: state.rounds,
  locationsObj: state.locations,
});

export default connect(mapStateToProps,
  { fetchImportedRound, fetchRoundCount, runImport })(Sidebar);
