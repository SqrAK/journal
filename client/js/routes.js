import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import PostsNew from './pages/PostsNew';
import PostsShow from './pages/PostsShow';
import SignIn from './pages/SignIn';
import ValidateEmail from './pages/ValidateEmail';
import Profile from './pages/Profile';
import StudentsList from './pages/StudentsList';
import StudentsShow from './pages/StudentsShow';
import MarksList from './pages/MarksList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SignIn} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="/students" component={StudentsList} />
    <Route path="/marks" component={MarksList} />
    <Route path="posts/:id" component={PostsShow} />
    <Route path="students/:id" component={StudentsShow} />
    <Route path="/signin" component={SignIn} />
    <Route path="/validateEmail/:token" component={ValidateEmail} />
    <Route path="/profile" component={Profile} />
  </Route>
);
