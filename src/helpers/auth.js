// import { get } from 'lodash';
// import { UserAuthWrapper } from 'redux-auth-wrapper';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper.js';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect.js'
// import createHistory from 'history/createBrowserHistory'
import Spinner from '../components/spinner/Spinner';
// import LoadingScreen from 'components/LoadingScreen'; // change it to your custom component

const locationHelper = locationHelperBuilder({});
// const history = createHistory()

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: Spinner,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/login',
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/dashboard',
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
});

// export const UserIsAdmin = UserAuthWrapper({ // eslint-disable-line new-cap
//   authSelector: ({ firebase: { profile, auth } }) => ({ auth, profile }),
//   authenticatingSelector: ({ firebase: { profile, auth, isInitializing } }) =>
//     auth === undefined || profile === undefined || isInitializing === true,
//   redirectAction: newLoc => (dispatch) => {
//     browserHistory.replace(newLoc);
//     dispatch({ type: UNAUTHED_REDIRECT });
//   },
//   allowRedirectBack: false,
//   failureRedirectPath: '/login',
//   wrapperDisplayName: 'UserIsAdmin',
//   predicate: auth => get(auth, `profile.role.name`) === 'admin',
//   LoadingComponent: Spinner,
// });