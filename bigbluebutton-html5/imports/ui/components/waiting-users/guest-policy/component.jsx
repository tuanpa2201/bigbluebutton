import React, {PureComponent} from 'react';
import {defineMessages, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import Styled from './styles';
import {notify} from '/imports/ui/services/notification';

const ASK_MODERATOR = 'ASK_MODERATOR';
const ALWAYS_ACCEPT = 'ALWAYS_ACCEPT';
const ALWAYS_DENY = 'ALWAYS_DENY';

const intlMessages = defineMessages({
  ariaModalTitle: {
    id: 'app.guest-policy.ariaTitle',
    description: 'Guest policy aria title',
  },
  guestPolicyTitle: {
    id: 'app.guest-policy.title',
    description: 'Guest policy title',
  },
  guestPolicyDescription: {
    id: 'app.guest-policy.description',
    description: 'Guest policy description',
  },
  policyBtnDesc: {
    id: 'app.guest-policy.policyBtnDesc',
    description: 'aria description for guest policy button',
  },
  askModerator: {
    id: 'app.guest-policy.button.askModerator',
    description: 'Ask moderator button label',
  },
  alwaysAccept: {
    id: 'app.guest-policy.button.alwaysAccept',
    description: 'Always accept button label',
  },
  alwaysDeny: {
    id: 'app.guest-policy.button.alwaysDeny',
    description: 'Always deny button label',
  },
  feedbackMessage: {
    id: 'app.guest-policy.feedbackMessage',
    description: 'Feedback message for guest policy change',
  },
  buttonApply: {
    id: 'app.lock-viewers.button.apply',
    description: 'label for apply button',
  },
  buttonCancel: {
    id: 'app.lock-viewers.button.cancel',
    description: 'label for cancel button',
  },
});

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  guestPolicy: PropTypes.string.isRequired,
  changeGuestPolicy: PropTypes.func.isRequired,
};

class GuestPolicyComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRole: this.props.guestPolicy, // default value
    };
    this.handleChangePolicy = this.handleChangePolicy.bind(this);
  }

  handleChange = (e) => {
    this.setState({ selectedRole: e.target.value });
  };

  componentWillUnmount() {
    const { setIsOpen } = this.props;

    setIsOpen(false);
  }

  // handleChangePolicy(policyRule, messageId) {
  //   const { intl, changeGuestPolicy } = this.props;
  //
  //   changeGuestPolicy(policyRule);
  //
  //   notify(intl.formatMessage(intlMessages.feedbackMessage) + intl.formatMessage(messageId), 'success');
  // }

  handleChangePolicy() {
    const { intl, changeGuestPolicy } = this.props;
    // default askModerator
    let policyRule= ASK_MODERATOR;
    let messageId = intlMessages.askModerator;
    if (ALWAYS_ACCEPT === this.state.selectedRole) {
      policyRule= ALWAYS_ACCEPT;
      messageId = intlMessages.alwaysAccept;
    } else if (ALWAYS_DENY === this.state.selectedRole) {
      policyRule= ALWAYS_DENY;
      messageId = intlMessages.alwaysDeny;
    }
    // alert("selectedRole: " + this.state.selectedRole)
    changeGuestPolicy(policyRule);
    notify(intl.formatMessage(intlMessages.feedbackMessage) + ' ' + intl.formatMessage(messageId), 'success');
  }

  render() {
    const {
      setIsOpen,
      intl,
      guestPolicy,
      isOpen,
      onRequestClose,
      priority,
    } = this.props;
    const { selectedRole } = this.state;
    return (
      <Styled.GuestPolicyModal className="policy-modal model-custom-tablet"
        onRequestClose={() => setIsOpen(false)}
        contentLabel={intl.formatMessage(intlMessages.ariaModalTitle)}
        title={intl.formatMessage(intlMessages.guestPolicyTitle)}
        {...{
          isOpen,
          onRequestClose,
          priority,
        }}
      >
        <Styled.Container className="policy-container"
          data-test="guestPolicySettingsModal"
        >
          <Styled.Description className="policy-desc">
            {intl.formatMessage(intlMessages.guestPolicyDescription)}
          </Styled.Description>

          <Styled.Content className="policy-content">
            {/*<Styled.GuestPolicyButton
              color="primary"
              disabled={guestPolicy === ASK_MODERATOR}
              label={intl.formatMessage(intlMessages.askModerator)}
              aria-describedby={guestPolicy === ASK_MODERATOR ? 'selected-btn-desc' : 'policy-btn-desc'}
              aria-pressed={guestPolicy === ASK_MODERATOR}
              data-test="askModerator"
              onClick={() => {
                this.handleChangePolicy(ASK_MODERATOR, intlMessages.askModerator);
                setIsOpen(false);
              }}
            />
            <Styled.GuestPolicyButton
              color="primary"
              disabled={guestPolicy === ALWAYS_ACCEPT}
              label={intl.formatMessage(intlMessages.alwaysAccept)}
              aria-describedby={guestPolicy === ALWAYS_ACCEPT ? 'selected-btn-desc' : 'policy-btn-desc'}
              aria-pressed={guestPolicy === ALWAYS_ACCEPT}
              data-test="alwaysAccept"
              onClick={() => {
                this.handleChangePolicy(ALWAYS_ACCEPT, intlMessages.alwaysAccept);
                setIsOpen(false);
              }}
            />
            <Styled.GuestPolicyButton
              color="primary"
              disabled={guestPolicy === ALWAYS_DENY}
              label={intl.formatMessage(intlMessages.alwaysDeny)}
              aria-describedby={guestPolicy === ALWAYS_DENY ? 'selected-btn-desc' : 'policy-btn-desc'}
              aria-pressed={guestPolicy === ALWAYS_DENY}
              data-test="alwaysDeny"
              onClick={() => {
                this.handleChangePolicy(ALWAYS_DENY, intlMessages.alwaysDeny);
                setIsOpen(false);
              }}
            />*/}

            <Styled.RadioGroup className="policy-radio-group">
              <Styled.RadioLabel className="policy-radio-label">
                <Styled.RadioCircle
                  id={selectedRole === ASK_MODERATOR ? 'radio_checked' : ''}
                  checked={selectedRole === ASK_MODERATOR}
                />
                <Styled.RadioInput type="radio"
                       name="role"
                       value={ASK_MODERATOR}
                       checked={selectedRole === ASK_MODERATOR}
                       onChange={this.handleChange}
                />
                <span>{intl.formatMessage(intlMessages.askModerator)}</span>
              </Styled.RadioLabel>
              <Styled.RadioLabel className="policy-radio-label">
                <Styled.RadioCircle
                  id={selectedRole === ALWAYS_ACCEPT ? 'radio_checked' : ''}
                  checked={selectedRole === ALWAYS_ACCEPT}
                />
                <Styled.RadioInput type="radio"
                       name="role"
                       value={ALWAYS_ACCEPT}
                       checked={selectedRole === ALWAYS_ACCEPT}
                       onChange={this.handleChange}
                />
                <span>{intl.formatMessage(intlMessages.alwaysAccept)}</span>
              </Styled.RadioLabel>
              <Styled.RadioLabel className="policy-radio-label">
                <Styled.RadioCircle
                  id={selectedRole === ALWAYS_DENY ? 'radio_checked' : ''}
                  checked={selectedRole === ALWAYS_DENY}
                />
                <Styled.RadioInput type="radio"
                       name="role"
                       value={ALWAYS_DENY}
                       checked={selectedRole === ALWAYS_DENY}
                       onChange={this.handleChange}
                />
                <span>{intl.formatMessage(intlMessages.alwaysDeny)}</span>
              </Styled.RadioLabel>
            </Styled.RadioGroup>
          </Styled.Content>
          <div id="policy-btn-desc" aria-hidden className="sr-only">
            {intl.formatMessage(intlMessages.policyBtnDesc)}
          </div>
        </Styled.Container>
        <Styled.Footer className="policy-footer">
          <Styled.Actions className="policy-action footer-model-custom-tablet">
            <Styled.ButtonCancel className="btn btn-default"
             label={intl.formatMessage(intlMessages.buttonCancel)}
             onClick={() => {
               setIsOpen(false);
             }}
             color="secondary"
            />
            <Styled.ButtonApply className="btn btn-primary"
              color="primary"
              label={intl.formatMessage(intlMessages.buttonApply)}
              onClick={() => {
                this.handleChangePolicy();
                setIsOpen(false);
              }}
              data-test="applyLockSettings"
            />
          </Styled.Actions>
        </Styled.Footer>
      </Styled.GuestPolicyModal>
    );
  }
}

GuestPolicyComponent.propTypes = propTypes;

export default injectIntl(GuestPolicyComponent);
