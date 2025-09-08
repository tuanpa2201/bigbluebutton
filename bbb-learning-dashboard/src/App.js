import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TabUnstyled from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import './App.css';
import {
  FormattedMessage, FormattedDate, injectIntl, FormattedTime,
} from 'react-intl';
import CardBody from './components/Card';
import UsersTable from './components/UsersTable';
import UserDetails from './components/UserDetails/component';
import { UserDetailsContext } from './components/UserDetails/context';
import StatusTable from './components/StatusTable';
import PollsTable from './components/PollsTable';
import PluginsTable from './components/PluginsTable';
import ErrorMessage from './components/ErrorMessage';
import { makeUserCSVData, tsToHHmmss } from './services/UserService';

const TABS = {
  OVERVIEW: 0,
  OVERVIEW_ACTIVITY_SCORE: 1,
  TIMELINE: 2,
  POLLING: 3,
};
const LEARNING_DASHBOARD_LEARN_MORE_LINK = 'learning-dashboard-learn-more-link';
const LEARNING_DASHBOARD_FEEDBACK_LINK = 'learning-dashboard-feedback-link';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      invalidSessionCount: 0,
      activitiesJson: {},
      tab: 0,
      meetingId: '',
      learningDashboardAccessToken: '',
      ldAccessTokenCopied: false,
      sessionToken: '',
      lastUpdated: null,
    };
  }

  componentDidMount() {
    this.setDashboardParams(() => {
      this.fetchActivitiesJson();
    });
  }

  handleSaveSessionData(e) {
    const { target: downloadButton } = e;
    const { intl } = this.props;
    const { activitiesJson } = this.state;
    const {
      name: meetingName, createdOn, users, polls, downloadSessionDataEnabled,
    } = activitiesJson;

    if (downloadSessionDataEnabled === false) return;

    const link = document.createElement('a');
    const data = makeUserCSVData(users, polls, intl);
    const filename = `LearningDashboard_${meetingName}_${new Date(createdOn).toISOString().substr(0, 10)}.csv`.replace(/ /g, '-');

    downloadButton.setAttribute('disabled', 'true');
    downloadButton.style.cursor = 'not-allowed';
    link.setAttribute('href', `data:text/csv;charset=UTF-8,${encodeURIComponent(data)}`);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    downloadButton.innerHTML = intl.formatMessage({ id: 'app.learningDashboard.downloadSessionDataLabel', defaultMessage: 'Download Session Data!' });
    setTimeout(() => {
      downloadButton.innerHTML = intl.formatMessage({ id: 'app.learningDashboard.downloadSessionDataLabel', defaultMessage: 'Download Session Data' });
      downloadButton.removeAttribute('disabled');
      downloadButton.style.cursor = 'pointer';
      downloadButton.focus();
    }, 3000);
    document.body.removeChild(link);
  }

  setDashboardParams(callback) {
    let learningDashboardAccessToken = '';
    let meetingId = '';
    let sessionToken = '';

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (typeof params.meeting !== 'undefined') {
      meetingId = params.meeting;
    }

    if (typeof params.sessionToken !== 'undefined') {
      sessionToken = params.sessionToken;
    }

    if (typeof params.report !== 'undefined') {
      learningDashboardAccessToken = params.report;
    } else {
      const cookieName = `ld-${params.meeting}`;
      const cDecoded = decodeURIComponent(document.cookie);
      const cArr = cDecoded.split('; ');
      cArr.forEach((val) => {
        if (val.indexOf(`${cookieName}=`) === 0) {
          learningDashboardAccessToken = val.substring((`${cookieName}=`).length);
        }
      });

      // Extend AccessToken lifetime by 7d (in each access)
      if (learningDashboardAccessToken !== '') {
        const cookieExpiresDate = new Date();
        cookieExpiresDate.setTime(cookieExpiresDate.getTime() + (3600000 * 24 * 7));
        const value = `ld-${meetingId}=${learningDashboardAccessToken};`;
        const expire = `expires=${cookieExpiresDate.toGMTString()};`;
        const args = 'path=/;SameSite=None;Secure';
        document.cookie = `${value} ${expire} ${args}`;
      }
    }

    this.setState({ learningDashboardAccessToken, meetingId, sessionToken }, () => {
      if (typeof callback === 'function') callback();
    });
  }

  fetchMostUsedReactions() {
    const { activitiesJson } = this.state;
    if (!activitiesJson) { return []; }

    // Count each reaction
    const reactionCount = {};
    const allReactionsUsed = Object
      .values(activitiesJson.users || {})
      .map((user) => user.reactions || [])
      .flat(1);
    allReactionsUsed.forEach((reaction) => {
      if (typeof reactionCount[reaction.name] === 'undefined') {
        reactionCount[reaction.name] = 0;
      }
      reactionCount[reaction.name] += 1;
    });

    // Get the three most used
    const mostUsedReactions = Object
      .entries(reactionCount)
      .filter(([, count]) => count)
      .sort(([, countA], [, countB]) => countA - countB)
      .reverse()
      .slice(0, 3);
    return mostUsedReactions.map(([reaction]) => reaction);
  }

  updateModalUser() {
    const { user, dispatch, isOpen } = this.context;
    const { activitiesJson } = this.state;
    const { users } = activitiesJson;

    if (isOpen && users[user.userKey]) {
      dispatch({
        type: 'changeUser',
        user: users[user.userKey],
      });
    }
  }

  fetchActivitiesJson() {
    const {
      learningDashboardAccessToken, meetingId, sessionToken, invalidSessionCount,
    } = this.state;

    // adjust user sessions to be compatible with old json
    const convertUserUsessionsFormat = (activitiesJson) => {
      const newActivivies = activitiesJson;
      Object.values(newActivivies.users).forEach((user) => {
        Object.values(user.intIds).forEach((intId) => {
          if (!intId?.sessions && intId?.registeredOn) {
            const newIntId = intId;
            newIntId.sessions = [
              { registeredOn: intId.registeredOn, leftOn: intId.leftOn },
            ];
          }
        });
      });
      return newActivivies;
    };

    if (learningDashboardAccessToken !== '') {
      fetch(`${meetingId}/${learningDashboardAccessToken}/learning_dashboard_data.json`)
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            activitiesJson: convertUserUsessionsFormat(json),
            loading: false,
            invalidSessionCount: 0,
            lastUpdated: Date.now(),
          });
          this.updateModalUser();
        }).catch(() => {
          this.setState({ loading: false, invalidSessionCount: invalidSessionCount + 1 });
        });
    } else if (sessionToken !== '') {
      const url = new URL('/bigbluebutton/api/learningDashboard', window.location);
      fetch(`${url}?sessionToken=${sessionToken}`, { credentials: 'include' })
        .then((response) => response.json())
        .then((json) => {
          if (json.response.returncode === 'SUCCESS') {
            const jsonData = JSON.parse(json.response.data);
            this.setState({
              activitiesJson: jsonData,
              loading: false,
              invalidSessionCount: 0,
              lastUpdated: Date.now(),
            });
            this.updateModalUser();
          } else {
            // When meeting is ended the sessionToken stop working, check for new cookies
            this.setDashboardParams();
            this.setState({ loading: false, invalidSessionCount: invalidSessionCount + 1 });
          }
        })
        .catch(() => {
          this.setState({ loading: false, invalidSessionCount: invalidSessionCount + 1 });
        });
    } else {
      this.setState({ loading: false });
    }

    setTimeout(() => {
      this.fetchActivitiesJson();
    }, 10000 * (2 ** invalidSessionCount));
  }

  render() {
    const {
      activitiesJson, tab, sessionToken, loading, lastUpdated,
      learningDashboardAccessToken, ldAccessTokenCopied,
    } = this.state;
    const { intl } = this.props;

    const genericDataCardTitle = activitiesJson?.genericDataTitles?.[0];
    // This line generates an array of all the plugin entries of all users,
    // this might have duplicate entries:
    const genericDataColumnTitleWithDuplicates = Object.values(
      activitiesJson.users || {}, // Hardcoded for now, we will add cards relative to this key.
    ).flatMap((
      user,
    ) => user.genericData?.[genericDataCardTitle]).filter((
      genericDataListForSpecificUser,
    ) => !!(
      genericDataListForSpecificUser?.columnTitle)).map((
      genericDataListForSpecificUser,
    ) => genericDataListForSpecificUser?.columnTitle);
    // This line will eliminate duplicates.
    const genericDataColumnTitleList = [...new Set(genericDataColumnTitleWithDuplicates)];

    document.title = `VOPS Meeting - ${intl.formatMessage({ id: 'app.learningDashboard.dashboardTitle', defaultMessage: 'Learning Analytics Dashboard' })} - ${activitiesJson.name}`;

    function totalOfReactions() {
      if (activitiesJson && activitiesJson.users) {
        return Object.values(activitiesJson.users)
          .reduce((prevVal, elem) => prevVal + elem.reactions.length, 0);
      }
      return 0;
    }

    function totalOfActivity() {
      const usersTimes = Object.values(activitiesJson.users || {}).reduce((prev, user) => ([
        ...prev,
        ...Object.values(user.intIds),
      ]), []);

      const minTime = Object.values(usersTimes || {}).reduce((prevVal, elem) => {
        if (prevVal === 0 || elem.sessions[0].registeredOn < prevVal) {
          return elem.sessions[0].registeredOn;
        }
        return prevVal;
      }, 0);

      const maxTime = Object.values(usersTimes || {}).reduce((prevVal, elem) => {
        if (elem.sessions[elem.sessions.length - 1].leftOn === 0) return (new Date()).getTime();
        if (elem.sessions[elem.sessions.length - 1].leftOn > prevVal) {
          return elem.sessions[elem.sessions.length - 1].leftOn;
        }
        return prevVal;
      }, 0);

      return maxTime - minTime;
    }

    function getAverageActivityScore() {
      let meetingAveragePoints = 0;

      const allUsers = Object.values(activitiesJson.users || {})
        .filter((currUser) => !currUser.isModerator);
      const nrOfUsers = allUsers.length;

      if (nrOfUsers === 0) return meetingAveragePoints;

      // Calculate points of Talking
      const usersTalkTime = allUsers.map((currUser) => currUser.talk.totalTime);
      const maxTalkTime = Math.max(...usersTalkTime);
      const totalTalkTime = usersTalkTime.reduce((prev, val) => prev + val, 0);
      if (totalTalkTime > 0) {
        meetingAveragePoints += ((totalTalkTime / nrOfUsers) / maxTalkTime) * 2;
      }

      // Calculate points of Chatting
      const usersTotalOfMessages = allUsers.map((currUser) => currUser.totalOfMessages);
      const maxMessages = Math.max(...usersTotalOfMessages);
      const totalMessages = usersTotalOfMessages.reduce((prev, val) => prev + val, 0);
      if (maxMessages > 0) {
        meetingAveragePoints += ((totalMessages / nrOfUsers) / maxMessages) * 2;
      }

      // Calculate points of Raise hand
      const usersRaiseHand = allUsers.map((currUser) => currUser.raiseHand.length);
      const maxRaiseHand = Math.max(...usersRaiseHand);
      const totalRaiseHand = usersRaiseHand.reduce((prev, val) => prev + val, 0);
      if (maxRaiseHand > 0) {
        meetingAveragePoints += ((totalRaiseHand / nrOfUsers) / maxRaiseHand) * 2;
      }

      // Calculate points of Reactions
      const usersReactions = allUsers.map((currUser) => currUser.reactions.length);
      const maxReactions = Math.max(...usersReactions);
      const totalReactions = usersReactions.reduce((prev, val) => prev + val, 0);
      if (maxReactions > 0) {
        meetingAveragePoints += ((totalReactions / nrOfUsers) / maxReactions) * 2;
      }

      // Calculate points of Polls
      const totalOfPolls = Object.values(activitiesJson.polls || {}).length;
      if (totalOfPolls > 0) {
        const totalAnswers = allUsers
          .reduce((prevVal, currUser) => prevVal + Object.values(currUser.answers || {}).length, 0);
        meetingAveragePoints += ((totalAnswers / nrOfUsers) / totalOfPolls) * 2;
      }

      return meetingAveragePoints;
    }

    function getErrorMessage() {
      if (learningDashboardAccessToken === '' && sessionToken === '') {
        return intl.formatMessage({ id: 'app.learningDashboard.errors.invalidToken', defaultMessage: 'Invalid session token' });
      }

      if (activitiesJson === {} || typeof activitiesJson.name === 'undefined') {
        return intl.formatMessage({ id: 'app.learningDashboard.errors.dataUnavailable', defaultMessage: 'Data is no longer available' });
      }

      return '';
    }

    if (loading === false && getErrorMessage() !== '') return <ErrorMessage message={getErrorMessage()} />;

    const usersCount = Object.values(activitiesJson.users || {})
      .filter((u) => activitiesJson.endedOn > 0
        || Object.values(u.intIds)[Object.values(u.intIds).length - 1].leftOn === 0)
      .length;

    return (
      <div className="mx-10 learn-restyle">
        <div className="flex flex-col sm:flex-row items-start justify-between pb-3">
          <h1 className="mt-3 text-2xl font-semibold inline-block font-semibold-h1">
            <FormattedMessage id="app.learningDashboard.dashboardTitle" defaultMessage="Learning Dashboard" />
            {
              ldAccessTokenCopied === true
                ? (
                  <span className="text-xs text-gray-500 font-normal ml-2">
                    <FormattedMessage id="app.learningDashboard.linkCopied" defaultMessage="Link successfully copied!" />
                  </span>
                )
                : null
            }
            <br />
            { activitiesJson?.other
              && activitiesJson.other[LEARNING_DASHBOARD_LEARN_MORE_LINK] !== ''
              && (
                <>
                  <span className="text-sm font-light font-base mt-0">
                    {intl.formatMessage({ id: 'app.learningDashboard.learnMore', defaultMessage: 'Learn more about the use of the Dashboard in {0} from our Knowledge Base.' }, {
                      0: (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={activitiesJson.other[LEARNING_DASHBOARD_LEARN_MORE_LINK]}
                          className="underline"
                        >
                          {intl.formatMessage({ id: 'app.learningDashboard.learnMoreLinkText', defaultMessage: 'this article' })}
                        </a>
                      ),
                    })}
                  </span>
                  <br />
                </>
              )}
            <span className="text-sm font-medium font-medium-restyle">{activitiesJson.name || ''}</span>
          </h1>
          <div className="mt-3 col-text-right py-1 text-gray-500 inline-block">
            <p className="font-bold">
              <div className="inline meetingDateDashboard" data-test="meetingDateDashboard">
                <FormattedDate
                  value={activitiesJson.createdOn}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
              </div>
              &nbsp;&nbsp;
              {
                activitiesJson.endedOn > 0
                  ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full state-ended">
                      <FormattedMessage id="app.learningDashboard.indicators.meetingStatusEnded" defaultMessage="Ended" data-test="meetingStatusEndedDashboard" />
                    </span>
                  )
                  : null
              }
              {
                activitiesJson.endedOn === 0
                  ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full state-active" data-test="meetingStatusActiveDashboard">
                      <FormattedMessage id="app.learningDashboard.indicators.meetingStatusActive" defaultMessage="Active" />
                    </span>
                  )
                  : null
              }
            </p>
            <p data-test="meetingDurationTimeDashboard" className="meetingDurationTimeDashboard">
              <FormattedMessage id="app.learningDashboard.indicators.duration" defaultMessage="Duration" />
              :&nbsp;
              {tsToHHmmss(totalOfActivity())}
            </p>
          </div>
        </div>

        <TabsUnstyled
          defaultValue={0}
          onChange={(e, v) => {
            this.setState({ tab: v });
          }}
        >
          <TabsListUnstyled className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <TabUnstyled className={tab === TABS.OVERVIEW ? 'card-restyle card-restyle-uer' : 'card-restyle card-restyle-uer card-restyle-inactive'} data-test="activeUsersPanelDashboard">
              <Card>
                <CardContent classes={{ root: '!p-0' }}>
                  <CardBody
                    name={
                      activitiesJson.endedOn === 0
                        ? intl.formatMessage({ id: 'app.learningDashboard.indicators.usersOnline', defaultMessage: 'Active Users' })
                        : intl.formatMessage({ id: 'app.learningDashboard.indicators.usersTotal', defaultMessage: 'Total Number Of Users' })
                    }
                    number={usersCount}
                    cardClass="card-restyle-content"
                    iconClass="db-icon-restyle db-icon-user"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12.5006 8.33268C14.3416 8.33268 15.834 6.8403 15.834 4.99935C15.834 3.1584 14.3416 1.66602 12.5006 1.66602M14.1673 18.3327H16.5006C17.9734 18.3327 19.1673 17.1388 19.1673 15.666V15.666C19.1673 13.4569 17.3765 11.666 15.1673 11.666H14.1673M10.0007 4.99935C10.0007 6.8403 8.50827 8.33268 6.66732 8.33268C4.82637 8.33268 3.33398 6.8403 3.33398 4.99935C3.33398 3.1584 4.82637 1.66602 6.66732 1.66602C8.50827 1.66602 10.0007 3.1584 10.0007 4.99935ZM3.50065 18.3327H9.83398C11.3067 18.3327 12.5006 17.1388 12.5006 15.666V15.666C12.5006 13.4569 10.7098 11.666 8.50065 11.666H4.83399C2.62485 11.666 0.833984 13.4569 0.833984 15.666V15.666C0.833984 17.1388 2.02789 18.3327 3.50065 18.3327Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </CardBody>
                </CardContent>
              </Card>
            </TabUnstyled>
            <TabUnstyled className={tab === TABS.OVERVIEW_ACTIVITY_SCORE ? 'card-restyle card-restyle-score' : 'card-restyle card-restyle-score card-restyle-inactive'} data-test="activityScorePanelDashboard">
              <Card>
                <CardContent classes={{ root: '!p-0' }}>
                  <CardBody
                    name={intl.formatMessage({ id: 'app.learningDashboard.indicators.activityScore', defaultMessage: 'Activity Score' })}
                    number={intl.formatNumber((getAverageActivityScore() || 0), {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    })}
                    cardClass="card-restyle-content"
                    iconClass="db-icon-restyle db-icon-score"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clipPath="url(#clip0_2577_37924)">
                        <path d="M4.99935 9.99935L6.66602 9.99935L8.33268 12.4993L11.666 7.49935L13.3327 9.99935L14.9994 9.99935M6.46602 18.3327L13.5327 18.3327C15.2128 18.3327 16.0529 18.3327 16.6947 18.0057C17.2591 17.7181 17.7181 17.2591 18.0057 16.6946C18.3327 16.0529 18.3327 15.2128 18.3327 13.5327L18.3327 6.46601C18.3327 4.78586 18.3327 3.94578 18.0057 3.30404C17.7181 2.73956 17.2591 2.28061 16.6947 1.99299C16.0529 1.66601 15.2128 1.66601 13.5327 1.66601L6.46602 1.66601C4.78586 1.66602 3.94578 1.66602 3.30404 1.993C2.73956 2.28062 2.28062 2.73956 1.993 3.30404C1.66602 3.94578 1.66602 4.78586 1.66602 6.46602L1.66602 13.5327C1.66602 15.2128 1.66602 16.0529 1.993 16.6947C2.28062 17.2591 2.73956 17.7181 3.30405 18.0057C3.94578 18.3327 4.78586 18.3327 6.46602 18.3327Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2577_37924">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </CardBody>
                </CardContent>
              </Card>
            </TabUnstyled>
            <TabUnstyled className={tab === TABS.TIMELINE ? 'card-restyle card-restyle-time' : 'card-restyle card-restyle-time card-restyle-inactive'} data-test="timelinePanelDashboard">
              <Card>
                <CardContent classes={{ root: '!p-0' }}>
                  <CardBody
                    name={intl.formatMessage({ id: 'app.learningDashboard.indicators.timeline', defaultMessage: 'Timeline' })}
                    number={totalOfReactions()}
                    cardClass="card-restyle-content"
                    iconClass="db-icon-restyle db-icon-time"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clipPath="url(#clip0_2577_37931)">
                        <path d="M10.0007 6.66732V10.0007L12.5006 11.6673M3.33398 0.833984L0.833984 3.33398M16.6673 0.833984L19.1673 3.33398M18.334 10.0007C18.334 14.603 14.603 18.334 10.0007 18.334C5.39828 18.334 1.66732 14.603 1.66732 10.0007C1.66732 5.39828 5.39828 1.66732 10.0007 1.66732C14.603 1.66732 18.334 5.39828 18.334 10.0007Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2577_37931">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    {this.fetchMostUsedReactions()}
                  </CardBody>
                </CardContent>
              </Card>
            </TabUnstyled>
            <TabUnstyled className={tab === TABS.POLLING ? 'card-restyle card-restyle-poll' : 'card-restyle card-restyle-poll card-restyle-inactive'} data-test="pollsPanelDashboard">
              <Card>
                <CardContent classes={{ root: '!p-0' }}>
                  <CardBody
                    name={intl.formatMessage({ id: 'app.learningDashboard.indicators.polls', defaultMessage: 'Polls' })}
                    number={Object.values(activitiesJson.polls || {}).length}
                    cardClass="card-restyle-content"
                    iconClass="db-icon-restyle db-icon-poll"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5.83268 6.66601L5.83268 13.3327M9.99935 9.16601L9.99935 13.3327M14.166 7.49935L14.166 13.3327M9.66602 18.3327L10.3327 18.3327C13.1329 18.3327 14.5331 18.3327 15.6026 17.7877C16.5434 17.3083 17.3084 16.5434 17.7877 15.6026C18.3327 14.5331 18.3327 13.1329 18.3327 10.3327L18.3327 9.66601C18.3327 6.86575 18.3327 5.46562 17.7877 4.39606C17.3083 3.45525 16.5434 2.69035 15.6026 2.21098C14.5331 1.66601 13.1329 1.66601 10.3327 1.66601L9.66601 1.66601C6.86575 1.66601 5.46562 1.66601 4.39606 2.21098C3.45525 2.69035 2.69035 3.45525 2.21098 4.39606C1.66602 5.46562 1.66602 6.86575 1.66602 9.66602L1.66602 10.3327C1.66602 13.1329 1.66602 14.5331 2.21099 15.6026C2.69035 16.5434 3.45526 17.3083 4.39607 17.7877C5.46562 18.3327 6.86576 18.3327 9.66602 18.3327Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </CardBody>
                </CardContent>
              </Card>
            </TabUnstyled>
            {genericDataColumnTitleList.length && (
              <TabUnstyled className="card-restyle card-restyle-user" data-test="pluginsPanelDashboard">
                <Card>
                  <CardContent classes={{ root: '!p-0' }}>
                    <CardBody
                      name={genericDataCardTitle}
                      number={genericDataColumnTitleList.length}
                      cardClass="card-restyle-content"
                      iconClass="db-icon-restyle db-icon-user"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </CardBody>
                  </CardContent>
                </Card>
              </TabUnstyled>
            )}
          </TabsListUnstyled>
          <TabPanelUnstyled value={0}>
            <h2 className="block my-2 pr-2 text-xl font-semibold font-semibold-h2">
              <FormattedMessage id="app.learningDashboard.usersTable.title" defaultMessage="Overview" />
            </h2>
            <div className="w-full overflow-hidden rounded-md shadow-xs border-2 border-gray-100">
              <div className="w-full overflow-x-auto">
                <UsersTable
                  allUsers={activitiesJson.users}
                  totalOfActivityTime={totalOfActivity()}
                  totalOfPolls={Object.values(activitiesJson.polls || {}).length}
                  tab="overview"
                />
              </div>
            </div>
          </TabPanelUnstyled>
          <TabPanelUnstyled value={1}>
            <h2 className="block my-2 pr-2 text-xl font-semibold">
              <FormattedMessage id="app.learningDashboard.usersTable.title" defaultMessage="Overview" />
            </h2>
            <div className="w-full overflow-hidden rounded-md shadow-xs border-2 border-gray-100">
              <div className="w-full overflow-x-auto">
                <UsersTable
                  allUsers={activitiesJson.users}
                  totalOfActivityTime={totalOfActivity()}
                  totalOfPolls={Object.values(activitiesJson.polls || {}).length}
                  tab="overview_activityscore"
                />
              </div>
            </div>
          </TabPanelUnstyled>
          <TabPanelUnstyled value={2}>
            <h2 className="block my-2 pr-2 text-xl font-semibold-h2">
              <FormattedMessage id="app.learningDashboard.statusTimelineTable.title" defaultMessage="Timeline" />
            </h2>
            <div className="w-full overflow-hidden rounded-md shadow-xs border-2 border-gray-100">
              <div className="w-full overflow-x-auto">
                <StatusTable
                  allUsers={activitiesJson.users}
                  slides={activitiesJson.presentationSlides}
                  meetingId={activitiesJson.intId}
                />
              </div>
            </div>
          </TabPanelUnstyled>
          <TabPanelUnstyled value={3}>
            <h2 className="block my-2 pr-2 text-xl font-semibold-h2">
              <FormattedMessage id="app.learningDashboard.pollsTable.title" defaultMessage="Polls" />
            </h2>
            <div className="w-full overflow-hidden rounded-md shadow-xs border-2 border-gray-100">
              <div className="w-full overflow-x-auto">
                <PollsTable polls={activitiesJson.polls} allUsers={activitiesJson.users} />
              </div>
            </div>
          </TabPanelUnstyled>
          <TabPanelUnstyled value={4}>
            <h2 className="block my-2 pr-2 text-xl font-semibold-h2">
              {genericDataCardTitle}
            </h2>
            <div className="w-full overflow-hidden rounded-md shadow-xs border-2 border-gray-100">
              <div className="w-full overflow-x-auto">
                <PluginsTable
                  genericDataCardTitle={genericDataCardTitle}
                  genericDataColumnTitleList={genericDataColumnTitleList}
                  allUsers={activitiesJson.users}
                />
              </div>
            </div>
          </TabPanelUnstyled>
        </TabsUnstyled>
        <UserDetails dataJson={activitiesJson} />
        <hr className="my-8" />
        { activitiesJson?.other
          && activitiesJson.other[LEARNING_DASHBOARD_FEEDBACK_LINK] !== ''
          && (
            <>
              <div className="mt-6 mb-4 text-sm font-light font-base text-gray-500">
                { intl.formatMessage({ id: 'app.learningDashboard.feedback', defaultMessage: 'How has your experience been with this feature? We would love to hear your opinion and even suggestions on how we can improve it. Share with us by clicking {0}.' }, {
                  0: (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={activitiesJson.other[LEARNING_DASHBOARD_FEEDBACK_LINK]}
                      className="underline"
                    >
                      {intl.formatMessage({ id: 'app.learningDashboard.feedbackLinkText', defaultMessage: 'here' })}
                    </a>
                  ),
                })}
              </div>
              <hr className="mb-8" />
            </>
          )}
        <div className="flex justify-between pb-8 text-xs text-gray-800 dark:text-gray-400 whitespace-nowrap flex-col sm:flex-row">
          <div className="flex flex-col justify-center mb-4 sm:mb-0">
            <p className="text-dashboard-last-updated">
              {
                lastUpdated && (
                  <>
                    <FormattedMessage
                      id="app.learningDashboard.lastUpdatedLabel"
                      defaultMessage="Last updated at"
                    />
                    &nbsp;
                    <FormattedTime
                      value={lastUpdated}
                    />
                    &nbsp;
                    <FormattedDate
                      value={lastUpdated}
                      year="numeric"
                      month="long"
                      day="numeric"
                    />
                  </>
                )
              }
            </p>
          </div>
          {
            (activitiesJson.downloadSessionDataEnabled || false)
              ? (
                <button
                  data-test="downloadSessionDataDashboard"
                  type="button"
                  className="border-2 text-gray-700 border-gray-200 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring ring-offset-2 focus:ring-gray-500 focus:ring-opacity-50 downloadSessionDataDashboard"
                  onClick={this.handleSaveSessionData.bind(this)}
                >
                  <FormattedMessage
                    id="app.learningDashboard.downloadSessionDataLabel"
                    defaultMessage="Download Session Data"
                  />
                </button>
              )
              : null
          }
        </div>
      </div>
    );
  }
}

App.contextType = UserDetailsContext;

export default injectIntl(App);
