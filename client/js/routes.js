import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import StudentsList from './pages/StudentsList';
import StudentsShow from './pages/StudentsShow';
import MarksList from './pages/MarksList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SignIn} />
    <Route path="/students" component={StudentsList} />
    <Route path="/marks" component={MarksList} />
    <Route path="students/:id" component={StudentsShow} />
    <Route path="/signin" component={SignIn} />
    <Route path="/profile" component={Profile} />
  </Route>
);
