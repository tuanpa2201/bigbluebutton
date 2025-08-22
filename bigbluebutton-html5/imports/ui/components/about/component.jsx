import React from 'react';
import { defineMessages, injectIntl, useIntl } from 'react-intl';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';

const intlMessages = defineMessages({
  title: {
    id: 'app.about.title',
    description: 'About title label',
  },
  version: {
    id: 'app.about.version',
    description: 'Client version label',
  },
  copyright: {
    id: 'app.about.copyright',
    defaultMessage: (new Date().getFullYear()),
    description: 'Client copyright label',
  },
  confirmLabel: {
    id: 'app.about.confirmLabel',
    description: 'Confirmation button label',
  },
  confirmDesc: {
    id: 'app.about.confirmDesc',
    description: 'adds descriptive context to confirmLabel',
  },
  dismissLabel: {
    id: 'app.about.dismissLabel',
    description: 'Dismiss button label',
  },
  dismissDesc: {
    id: 'app.about.dismissDesc',
    description: 'adds descriptive context to dissmissLabel',
  },
  version_label: {
    id: 'app.about.version_label',
    description: 'label for version bbb',
  },
});

const AboutComponent = (props) => {
  const { isOpen, onRequestClose, priority } = props;
  const intl = useIntl();

  return (
    <ModalSimple
      data-test="aboutModalTitleLabel"
      className="modal-about model-custom-mobile"
      title={intl.formatMessage(intlMessages.title)}
      dismiss={{
        label: intl.formatMessage(intlMessages.dismissLabel),
        description: intl.formatMessage(intlMessages.dismissDesc),
      }}
      {...{
        isOpen,
        onRequestClose,
        priority,
      }}
    >
      <div className="text-base">
        <span className="font-regular-s text-primary text-primary-dark">{`${intl.formatMessage(intlMessages.copyright)} ©${new Date().getFullYear()}`}</span>
        <div className="mt-16 mb-8-i">Developed: Viettel IT Center (VIC)</div>
      </div>
    </ModalSimple>
  );
};

export default injectIntl(AboutComponent);
