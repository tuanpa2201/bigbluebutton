
package org.bigbluebutton.core.api;

import java.util.HashMap;

public class EjectUserFromMeetingCmdMsg implements IMessage {

    public final String meetingId;
    public final String userId;
    public final String ejectedBy;
    public final Boolean banUser;

    public EjectUserFromMeetingCmdMsg(HashMap<String, Object> message) {
        this.meetingId = (String) message.get("meetingId");
        this.userId = (String) message.get("userId");
        this.ejectedBy = (String) message.get("ejectedBy");
        this.banUser = (Boolean) message.getOrDefault("banUser", false);
    }

    public String getMeetingId() {
        return meetingId;
    }

    public String getUserId() {
        return userId;
    }

    public String getEjectedBy() {
        return ejectedBy;
    }

    public Boolean getBanUser() {
        return banUser;
    }
}
