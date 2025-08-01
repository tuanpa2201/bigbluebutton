import React from 'react';
import {
  FormattedMessage, FormattedDate, FormattedNumber, injectIntl,
} from 'react-intl';
import { getUserReactionsSummary } from '../services/ReactionService';
import { getActivityScore, getSumOfTime, tsToHHmmss, tsToHHmm } from '../services/UserService';
import UserAvatar from './UserAvatar';
import { UserDetailsContext } from './UserDetails/context';

function renderArrow(order = 'asc') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 inline"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={order === 'asc' ? 'M7 11l5-5m0 0l5 5m-5-5v12' : 'M17 13l-5 5m0 0l-5-5m5 5V6'}
      />
    </svg>
  );
}

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrder: 'asc',
      onlineTimeOrder: 'desc',
      talkTimeOrder: 'desc',
      webcamTimeOrder: 'desc',
      activityscoreOrder: 'desc',
      lastFieldClicked: 'userOrder',
    };

    this.openUserModal = this.openUserModal.bind(this);
  }

  toggleOrder(field) {
    const { [field]: fieldOrder } = this.state;
    const { tab } = this.props;

    if (fieldOrder === 'asc') {
      this.setState({ [field]: 'desc' });
    } else {
      this.setState({ [field]: 'asc' });
    }

    if (tab === 'overview') this.setState({ lastFieldClicked: field });
  }

  openUserModal(user) {
    const { dispatch } = this.context;

    dispatch({
      type: 'changeUser',
      user,
    });
  }

  render() {
    const {
      allUsers, totalOfActivityTime, totalOfPolls, tab,
    } = this.props;

    const {
      activityscoreOrder, userOrder, onlineTimeOrder,
      talkTimeOrder, webcamTimeOrder, lastFieldClicked,
    } = this.state;

    const usersReactionsSummary = {};
    Object.values(allUsers || {}).forEach((user) => {
      usersReactionsSummary[user.userKey] = getUserReactionsSummary(user);
    });

    function getOnlinePercentage(registeredOn, leftOn) {
      const totalUserOnlineTime = ((leftOn > 0 ? leftOn : (new Date()).getTime())) - registeredOn;
      return Math.ceil((totalUserOnlineTime / totalOfActivityTime) * 100);
    }

    const usersActivityScore = {};
    Object.values(allUsers || {}).forEach((user) => {
      usersActivityScore[user.userKey] = getActivityScore(user, allUsers, totalOfPolls);
    });

    const sortFunctions = {
      userOrder(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return userOrder === 'desc' ? 1 : -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return userOrder === 'desc' ? -1 : 1;
        }
        return 0;
      },
      onlineTimeOrder(a, b) {
        const onlineTimeA = Object.values(a.intIds).reduce((prev, intId) => (
          prev + intId.sessions.reduce((prev2, session) => (
            prev2 + (session.leftOn > 0
              ? session.leftOn
              : (new Date()).getTime()) - session.registeredOn), 0)
        ), 0);

        const onlineTimeB = Object.values(b.intIds).reduce((prev, intId) => (
          prev + intId.sessions.reduce((prev2, session) => (
            prev2 + (session.leftOn > 0
              ? session.leftOn
              : (new Date()).getTime()) - session.registeredOn), 0)
        ), 0);

        if (onlineTimeA < onlineTimeB) {
          return onlineTimeOrder === 'desc' ? 1 : -1;
        }

        if (onlineTimeA > onlineTimeB) {
          return onlineTimeOrder === 'desc' ? -1 : 1;
        }

        return 0;
      },
      talkTimeOrder(a, b) {
        const talkTimeA = a.talk.totalTime;
        const talkTimeB = b.talk.totalTime;

        if (talkTimeA < talkTimeB) {
          return talkTimeOrder === 'desc' ? 1 : -1;
        }

        if (talkTimeA > talkTimeB) {
          return talkTimeOrder === 'desc' ? -1 : 1;
        }

        return 0;
      },
      webcamTimeOrder(a, b) {
        const webcamTimeA = getSumOfTime(a.webcams);
        const webcamTimeB = getSumOfTime(b.webcams);

        if (webcamTimeA < webcamTimeB) {
          return webcamTimeOrder === 'desc' ? 1 : -1;
        }

        if (webcamTimeA > webcamTimeB) {
          return webcamTimeOrder === 'desc' ? -1 : 1;
        }

        return 0;
      },
      activityscoreOrder(a, b) {
        if (usersActivityScore[a.userKey] < usersActivityScore[b.userKey]) {
          return activityscoreOrder === 'desc' ? 1 : -1;
        }
        if (usersActivityScore[a.userKey] > usersActivityScore[b.userKey]) {
          return activityscoreOrder === 'desc' ? -1 : 1;
        }
        if (a.isModerator === false && b.isModerator === true) return 1;
        if (a.isModerator === true && b.isModerator === false) return -1;
        return 0;
      },
    };

    return (
      <table className="w-full">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 border-b bg-gray-100 font-medium-th">
            <th
              className={`px-3.5 2xl:px-4 py-3 col-text-left ${tab === 'overview' ? 'cursor-pointer' : ''}`}
              onClick={() => { if (tab === 'overview') this.toggleOrder('userOrder'); }}
            >
              <FormattedMessage id="app.learningDashboard.user" defaultMessage="User" />
              { tab === 'overview' && lastFieldClicked === 'userOrder'
                ? renderArrow(userOrder)
                : null }
            </th>
            <th
              className={`px-3.5 2xl:px-4 py-3 text-center ${tab === 'overview' ? 'cursor-pointer' : ''}`}
              onClick={() => { if (tab === 'overview') this.toggleOrder('onlineTimeOrder'); }}
            >
              <FormattedMessage id="app.learningDashboard.usersTable.colOnline" defaultMessage="Online time" />
              { tab === 'overview' && lastFieldClicked === 'onlineTimeOrder'
                ? renderArrow(onlineTimeOrder)
                : null }
            </th>
            <th
              className={`px-3.5 2xl:px-4 py-3 text-center ${tab === 'overview' ? 'cursor-pointer' : ''}`}
              onClick={() => { if (tab === 'overview') this.toggleOrder('talkTimeOrder'); }}
            >
              <FormattedMessage id="app.learningDashboard.usersTable.colTalk" defaultMessage="Talk time" />
              { tab === 'overview' && lastFieldClicked === 'talkTimeOrder'
                ? renderArrow(talkTimeOrder)
                : null }
            </th>
            <th
              className={`px-3.5 2xl:px-4 py-3 text-center ${tab === 'overview' ? 'cursor-pointer' : ''}`}
              onClick={() => { if (tab === 'overview') this.toggleOrder('webcamTimeOrder'); }}
            >
              <FormattedMessage id="app.learningDashboard.usersTable.colWebcam" defaultMessage="Webcam Time" />
              { tab === 'overview' && lastFieldClicked === 'webcamTimeOrder'
                ? renderArrow(webcamTimeOrder)
                : null }
            </th>
            <th className="px-3.5 2xl:px-4 py-3 text-center">
              <FormattedMessage id="app.learningDashboard.usersTable.colMessages" defaultMessage="Messages" />
            </th>
            <th className="px-3.5 2xl:px-4 py-3 col-text-left">
              <FormattedMessage id="app.learningDashboard.usersTable.colReactions" defaultMessage="Reactions" />
            </th>
            <th className="px-3.5 2xl:px-4 py-3 text-center">
              <FormattedMessage id="app.learningDashboard.usersTable.colRaiseHands" defaultMessage="Raise Hand" />
            </th>
            <th
              className={`px-3.5 2xl:px-4 py-3 text-center ${tab === 'overview_activityscore' ? 'cursor-pointer' : ''}`}
              onClick={() => { if (tab === 'overview_activityscore') this.toggleOrder('activityscoreOrder'); }}
            >
              <FormattedMessage id="app.learningDashboard.usersTable.colActivityScore" defaultMessage="Activity Score" />
              { tab === 'overview_activityscore'
                ? renderArrow(activityscoreOrder)
                : null }
            </th>
            <th className="px-3.5 2xl:px-4 py-3 text-center">
              <FormattedMessage id="app.learningDashboard.usersTable.colStatus" defaultMessage="Status" />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y whitespace-nowrap">
          { typeof allUsers === 'object' && Object.values(allUsers || {}).length > 0 ? (
            Object.values(allUsers || {})
              .sort(tab === 'overview' ? sortFunctions[lastFieldClicked] : sortFunctions.activityscoreOrder)
              .map((user) => {
                const opacity = user.leftOn > 0 ? 'opacity-75' : '';
                return (
                  <tr key={user} className="text-gray-700">
                    <td className={`flex items-center px-4 py-3 col-text-left text-sm ${opacity}`} data-test="userLabelDashboard">
                      <div className="inline-block relative w-8 h-8 rounded-full">
                        <UserAvatar user={user} />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      &nbsp;&nbsp;&nbsp;
                      <div className="inline-block">
                        <button
                          className="leading-none border-0 p-0 m-0 bg-none font-semibold truncate xl:max-w-sm max-w-xs cursor-pointer focus:rounded focus:outline-none focus:ring ring-offset-0 focus:ring-gray-500 focus:ring-opacity-50 underline decoration-dotted decoration-from-font hover:opacity-75 focus:no-underline active:opacity-95"
                          type="button"
                          onClick={() => this.openUserModal(user)}
                          aria-label={`Open user details modal - ${user.name}`}
                        >
                          {user.name}
                        </button>
                        { Object.values(user.intIds || {}).map((intId, index) => intId.sessions
                          .map((session, sessionIndex) => (
                            <>
                              <div className="user-join-trace">
                                <p className="text-user-trace inline-block">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M7 1H7.25H7.8C8.9201 1 9.48016 1 9.90798 1.21799C10.2843 1.40973 10.5903 1.71569 10.782 2.09202C11 2.51984 11 3.07989 11 4.2V7.8C11 8.92011 11 9.48016 10.782 9.90798C10.5903 10.2843 10.2843 10.5903 9.90798 10.782C9.48016 11 8.9201 11 7.8 11H7.25H7M1 6H7M7 6L5 4M7 6L5 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  <FormattedDate
                                    value={session.registeredOn}
                                    month="short"
                                    day="numeric"
                                    hour="2-digit"
                                    minute="2-digit"
                                    second="2-digit"
                                  />
                                </p>
                                { session.leftOn > 0 ? (<span> | </span>): null}
                                { session.leftOn > 0
                                  ? (
                                    <p className="text-user-trace inline-block">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M5 1H4.75H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V7.8C1 8.92011 1 9.48016 1.21799 9.90798C1.40973 10.2843 1.71569 10.5903 2.09202 10.782C2.51984 11 3.0799 11 4.2 11H4.75H5M5 6H11M11 6L9 4M11 6L9 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>

                                      <FormattedDate
                                        value={session.leftOn}
                                        month="short"
                                        day="numeric"
                                        hour="2-digit"
                                        minute="2-digit"
                                        second="2-digit"
                                      />
                                    </p>
                                  )
                                  : null }
                              </div>
                              { index === Object.values(user.intIds).length - 1
                                && sessionIndex === intId?.sessions.length - 1
                                ? null
                                : (
                                  <hr className="my-1" />
                                ) }
                            </>
                          ))) }
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm text-center items-center ${opacity}`} data-test="userOnlineTimeDashboard">
                      <span className="text-center text-td-restyle">
                        { tsToHHmm(Object.values(user.intIds).reduce((prev, intId) => (
                            prev + intId.sessions.reduce((prev2, session) => ((session.leftOn > 0
                                ? prev2 + session.leftOn
                                : prev2 + (new Date()).getTime()) - session.registeredOn), 0)), 0)) } &nbsp;min
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${opacity}`} data-test="userTotalTalkTimeDashboard">
                      { user.talk.totalTime > 0 ? (
                        <span className="text-center text-td-restyle">
                          { tsToHHmm(user.talk.totalTime) }&nbsp;min
                        </span>
                      ) : (<span>-</span>) }
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${opacity}`} data-test="userWebcamTimeDashboard">
                      { getSumOfTime(user.webcams) > 0 ? (
                        <span className="text-center text-td-restyle">
                          { tsToHHmm(getSumOfTime(user.webcams)) }&nbsp;min
                        </span>
                      ) : (<span>-</span>) }
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${opacity}`} data-test="userTotalMessagesDashboard">
                      { user.totalOfMessages > 0
                        ? (
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 inline"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            &nbsp;
                            {user.totalOfMessages}
                          </span>
                        ) : (<span>-</span>) }
                    </td>
                    <td className={`px-4 py-3 text-sm col-text-left ${opacity}`} data-test="userTotalReactionsDashboard">
                      {
                        Object.keys(usersReactionsSummary[user.userKey] || {}).map((reaction) => (
                          <div className="text-xs whitespace-nowrap">
                            {reaction}
                            &nbsp;
                            { usersReactionsSummary[user.userKey][reaction] }
                            &nbsp;
                          </div>
                        ))
                      }
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${opacity}`} data-test="userRaiseHandDashboard">
                      { user.raiseHand.length > 0
                        ? (
                          <span>
                            ✋
                            &nbsp;
                            {user.raiseHand.length}
                          </span>
                        ) : (<span>-</span>) }
                    </td>
                    {
                      !user.isModerator ? (
                        <td className={`px-4 py-3 text-sm text-center items ${opacity}`} data-test="userActivityScoreDashboard">
                          <svg viewBox="0 0 82 12" width="82" height="12" className="flex-none m-auto inline">
                            <rect width="12" height="12" fill={usersActivityScore[user.userKey] > 0 ? '#4BA381' : '#e4e4e7'} />
                            <rect width="12" height="12" x="14" fill={usersActivityScore[user.userKey] > 2 ? '#338866' : '#e4e4e7'} />
                            <rect width="12" height="12" x="28" fill={usersActivityScore[user.userKey] > 4 ? '#1A6653' : '#e4e4e7'} />
                            <rect width="12" height="12" x="42" fill={usersActivityScore[user.userKey] > 6 ? '#055C42' : '#e4e4e7'} />
                            <rect width="12" height="12" x="56" fill={usersActivityScore[user.userKey] > 8 ? '#023B34' : '#e4e4e7'} />
                            <rect width="12" height="12" x="70" fill={usersActivityScore[user.userKey] === 10 ? '#02362B' : '#e4e4e7'} />
                          </svg>
                          &nbsp;
                          <span className="text-xs bg-gray-200 rounded-full px-2">
                            <FormattedNumber value={usersActivityScore[user.userKey]} minimumFractionDigits="0" maximumFractionDigits="1" />
                          </span>
                        </td>
                      ) : (
                        <td className="px-4 py-3 text-sm text-center">
                          <FormattedMessage id="app.learningDashboard.usersTable.notAvailable" defaultMessage="-" />
                        </td>
                      )
                    }
                    <td className="px-3.5 2xl:px-4 py-3 text-xs text-center" data-test="userStatusDashboard">
                      {
                        Object.values(user.intIds)[Object.values(user.intIds).length - 1]
                          .sessions.slice(-1)[0].leftOn > 0
                          ? (
                            <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full span-offline">
                              <FormattedMessage id="app.learningDashboard.usersTable.userStatusOffline" defaultMessage="Offline" />
                            </span>
                          )
                          : (
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full span-online">
                              <FormattedMessage id="app.learningDashboard.usersTable.userStatusOnline" defaultMessage="Online" />
                            </span>
                          )
                      }
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr className="text-gray-700">
              <td colSpan="8" className="px-3.5 2xl:px-4 py-3 text-sm text-center">
                <FormattedMessage id="app.learningDashboard.usersTable.noUsers" defaultMessage="No users" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

UsersTable.contextType = UserDetailsContext;

export default injectIntl(UsersTable);
