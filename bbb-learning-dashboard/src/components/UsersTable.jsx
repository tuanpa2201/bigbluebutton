import React from 'react';
import {
  FormattedMessage, FormattedDate, FormattedNumber, injectIntl,
} from 'react-intl';
import { getUserReactionsSummary } from '../services/ReactionService';
import { getActivityScore, getSumOfTime, tsToHHmm } from '../services/UserService';
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
      allUsers, totalOfPolls, tab,
    } = this.props;

    const {
      activityscoreOrder, userOrder, onlineTimeOrder,
      talkTimeOrder, webcamTimeOrder, lastFieldClicked,
    } = this.state;

    const usersReactionsSummary = {};
    Object.values(allUsers || {}).forEach((user) => {
      usersReactionsSummary[user.userKey] = getUserReactionsSummary(user);
    });

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
        if (a.isModerator === false && b.isModerator === true) return -1;
        if (a.isModerator === true && b.isModerator === false) return 1;
        if (usersActivityScore[a.userKey] < usersActivityScore[b.userKey]) {
          return activityscoreOrder === 'desc' ? 1 : -1;
        }
        if (usersActivityScore[a.userKey] > usersActivityScore[b.userKey]) {
          return activityscoreOrder === 'desc' ? -1 : 1;
        }
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
              .sort(sortFunctions.activityscoreOrder)
              .map((user) => {
                const opacity = user.leftOn > 0 ? 'opacity-75' : '';
                return (
                  <tr key={user} className="text-gray-700">
                    <td className={`flex items-center px-4 py-3 col-text-left text-sm ${opacity}`} data-test="userLabelDashboard">
                      <div className="inline-block relative w-8 h-8 rounded-full">
                        <UserAvatar user={user} />
                        <div
                          className="absolute inset-0 shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      &nbsp;&nbsp;&nbsp;
                      <div className="inline-block">
                        <button
                          className="leading-none border-0 p-0 m-0 bg-none font-semibold truncate xl:max-w-sm max-w-xs cursor-pointer focus:rounded focus:outline-none focus:ring ring-offset-0 focus:ring-gray-500 focus:ring-opacity-50 decoration-dotted decoration-from-font hover:opacity-75 focus:no-underline active:opacity-95"
                          type="button"
                          onClick={() => this.openUserModal(user)}
                          aria-label={`Open user details modal - ${user.name}`}
                        >
                          <span className="inline-block">
                            {user.name}
                          </span>
                          {
                            user.isModerator ? (
                              <span className="inline-block" aria-label="Moderator">
                                (
                                <FormattedMessage id="app.userList.moderator" defaultMessage="Moderator" />
                                )
                              </span>
                            ) : null
                          }
                        </button>
                        { Object.values(user.intIds || {}).map((intId, index) => intId.sessions
                          .map((session, sessionIndex) => (
                            <>
                              <div className="user-join-trace">
                                <p className="text-user-trace">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M7 1H7.25H7.8C8.9201 1 9.48016 1 9.90798 1.21799C10.2843 1.40973 10.5903 1.71569 10.782 2.09202C11 2.51984 11 3.07989 11 4.2V7.8C11 8.92011 11 9.48016 10.782 9.90798C10.5903 10.2843 10.2843 10.5903 9.90798 10.782C9.48016 11 8.9201 11 7.8 11H7.25H7M1 6H7M7 6L5 4M7 6L5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
                                { session.leftOn > 0 ? (<span> | </span>) : null}
                                { session.leftOn > 0
                                  ? (
                                    <p className="text-user-trace">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M5 1H4.75H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V7.8C1 8.92011 1 9.48016 1.21799 9.90798C1.40973 10.2843 1.71569 10.5903 2.09202 10.782C2.51984 11 3.0799 11 4.2 11H4.75H5M5 6H11M11 6L9 4M11 6L9 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
                            : prev2 + (new Date()).getTime()) - session.registeredOn), 0)), 0)) }
                        &nbsp;min
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${opacity}`} data-test="userTotalTalkTimeDashboard">
                      { user.talk.totalTime > 0 ? (
                        <span className="text-center text-td-restyle">
                          { tsToHHmm(user.talk.totalTime)}
                          &nbsp;min
                        </span>
                      ) : (<span>-</span>) }
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${opacity}`} data-test="userWebcamTimeDashboard">
                      { getSumOfTime(user.webcams) > 0 ? (
                        <span className="text-center text-td-restyle">
                          { tsToHHmm(getSumOfTime(user.webcams)) }
                          &nbsp;min
                        </span>
                      ) : (<span>-</span>) }
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${opacity}`} data-test="userTotalMessagesDashboard">
                      { user.totalOfMessages > 0
                        ? (
                          <span>
                            <svg width="16" class="h-4 w-4 inline" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.98547 12.5794C5.74233 12.5342 5.51102 12.4715 5.28721 12.3915C4.8013 12.2176 4.55834 12.1307 4.46511 12.1088C3.60496 11.9065 3.24813 12.496 2.50679 12.6196C2.14267 12.6802 1.81868 12.3821 1.84889 12.0142C1.87531 11.6925 2.09779 11.3883 2.18656 11.0794C2.37111 10.4372 2.12068 9.95025 1.85611 9.37912C1.52107 8.65587 1.33398 7.85009 1.33398 7.00065C1.33398 3.87104 3.87104 1.33398 7.00065 1.33398C9.02856 1.33398 10.8077 2.39922 11.8089 4.00065M7.33398 10.0007C7.33398 12.2098 9.12485 14.0007 11.334 14.0007C11.7897 14.0007 12.1806 13.9357 12.5435 13.8059C12.8865 13.6832 13.058 13.6219 13.1238 13.6064C13.7309 13.4636 13.9828 13.8798 14.5061 13.9669C14.7632 14.0098 14.9918 13.7993 14.9705 13.5396C14.9519 13.3126 14.7948 13.0978 14.7322 12.8797C14.6019 12.4264 14.7787 12.0827 14.9654 11.6796C15.2019 11.169 15.334 10.6003 15.334 10.0007C15.334 7.79151 13.5431 6.00065 11.334 6.00065C9.12485 6.00065 7.33398 7.79151 7.33398 10.0007Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="ml-12">
                              {user.totalOfMessages}
                            </span>
                          </span>
                        ) : (<span>-</span>) }
                    </td>
                    <td className={`px-4 py-3 text-sm col-text-left ${opacity}`} data-test="userTotalReactionsDashboard">
                      {
                        usersReactionsSummary[user.userKey] ? (
                            Object.keys(usersReactionsSummary[user.userKey] || {}).map((reaction) => (
                                <div className="text-xs whitespace-nowrap">
                                  {reaction}
                                  &nbsp;
                                  { usersReactionsSummary[user.userKey][reaction] }
                                  &nbsp;
                                </div>
                            ))
                        ) : (<span>-</span>)
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
                          <div className="rectangle-container">
                            <div className={usersActivityScore[user.userKey] > 0 ? 'rectangle-score bd-pass-1' : 'rectangle-score'} />
                            <div className={usersActivityScore[user.userKey] > 2 ? 'rectangle-score bd-pass-2' : 'rectangle-score'} />
                            <div className={usersActivityScore[user.userKey] > 4 ? 'rectangle-score bd-pass-3' : 'rectangle-score'} />
                            <div className={usersActivityScore[user.userKey] > 6 ? 'rectangle-score bd-pass-4' : 'rectangle-score'} />
                            <div className={usersActivityScore[user.userKey] > 8 ? 'rectangle-score bd-pass-5' : 'rectangle-score'} />
                            <span className="ml-12">
                              <FormattedNumber value={usersActivityScore[user.userKey]} minimumFractionDigits="0" maximumFractionDigits="1"/>
                            </span>
                          </div>
                        </td>
                      ) : (
                          <td className="px-4 py-3 text-sm text-center">
                            <span>-</span>
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
