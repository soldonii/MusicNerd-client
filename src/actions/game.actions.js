import {
  UPDATE_PARTICIPANTS,
} from '../constants/index';


export const updateParticipants = dispatch => participants => {
  dispatch({ type: UPDATE_PARTICIPANTS, participants });
};
