import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import Subject from '../components/Subject'
import Mark from '../components/Mark'
import * as pageActions from '../actions/PageActions'

class App extends Component {
  render() {
    const { user, subject, mark, page } = this.props
    const { setYear } = this.props.pageActions

    return <div>
      <User name={user.name} />
      <div className="wrapper">
      <Subject subject={subject.subject} />
      <Mark marks={mark.marks}/>
      </div>
      <Page photos={page.photos} year={page.year} setYear={setYear} />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    subject: state.subject,
    mark: state.mark,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
