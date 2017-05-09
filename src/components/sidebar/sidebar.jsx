import React, { Component, PropTypes } from 'react';
import { Row, Col, Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { ImportPop } from 'components';
import Select from 'react-select';
import helper from 'helpers/round';
import { fetchImportedRound, fetchSingleRound, fetchRoundCount, runImport, toggleSidebar } from 'redux/actions/roundActions';

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
    validRoundNumber: null,
    status: 'running',
    disableLink: '',
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

  roundNumberCheck = (e) => {
    const check = parseInt(e.target.value, 10);
    if (typeof check === 'number' && check > 0) {
      this.setState({ validRoundNumber: null });
    } else {
      this.setState({ validRoundNumber: 'error' });
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

  completeImport = (roundCode) => {
    toastr.success('Completed Data Import!', { timeOut: 3000 });
    this.setState({ status: 'complete', disableLink: '' });
    this.props.fetchImportedRound(roundCode);
    this.props.fetchRoundCount(roundCode);
  }

  pollServer = (roundCode) => {
    this.props.fetchSingleRound(roundCode)
      .then(() => {
        this.completeImport(roundCode);
      })
      .catch(() => {
        setTimeout(() => {
          this.pollServer(roundCode);
        }, 10000);
      });
  }

  handleImport = (e) => {
    e.preventDefault();
    this.setState({ showModal: false, disableLink: 'disabled' });
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
        toastr.info('Spreadsheet import in progress.', { timeOut: 3000 });
        const roundCode = res.roundCode;
        this.setState({ roundCode });
        this.pollServer(roundCode);
      })
      .catch((err) => {
        this.setState({ disableLink: '' });
        toastr.error(err.message, { timeOut: 3000 });
      });
  }

  toggleMenu = () => {
    if (this.props.roundObj.toggleState === 'untoggled') {
      this.props.toggleSidebar('toggled');
    } else {
      this.props.toggleSidebar('untoggled');
    }
  }

  render() {
    const importCheck = this.props.roundObj && this.props.roundObj.importLoading;
    const buttonStyle = (this.state.location === '' || this.state.location === null || this.state.roundNumber === '' || this.state.validRoundNumber === 'error' || this.state.startDate === '' || this.state.endDate === '' || this.state.sheetId === '' || this.state.validUrl === 'error' || this.state.roundType === '' || this.state.roundType === null) ? ' disabled' : '';
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
          <a href="#"  // eslint-disable-line
            className="btn btn-link radius-secondary bk_trans margin-menu-button" onClick={this.toggleMenu} id="menu-toggle" data-toggle="tooltip" data-container="body" data-placement="right" title="Expand Menu"
          >
            <i className="icon icon-menu" />
          </a>
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
            <a href="#" className={`menu-linker ${this.state.disableLink}`} // eslint-disable-line
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
                    <FormGroup validationState={this.state.validRoundNumber}>
                      <ControlLabel>Round Number</ControlLabel>
                      <FormControl type="text" placeholder="Enter the Round code" onBlur={this.roundNumberCheck} name="roundNumber" value={this.state.roundNumber} onChange={this.handleRoundNumberChange} />
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
  fetchSingleRound: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  runImport: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleSidebar: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  user: state.user,
  roundObj: state.rounds,
  locationsObj: state.locations,
});

export default connect(mapStateToProps,
  { fetchImportedRound, fetchSingleRound, fetchRoundCount, runImport, toggleSidebar })(Sidebar);
