
import {localUrl} from "../store";
import {scheduleActionSchedule} from "../reducers/sheduleReducer/sheduleReducer";
import axios from "axios";

export const getSchedule = (id) => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSchedule",
                    "query": `query fetchSchedule{ schedule (filter: {groupID:"${id}"}) {id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type }}`,
                }
            });

            dispatch(scheduleActionSchedule(res.data.data.schedule));

            return true
        } catch (error) {
            if (error.response.data.status === 400) {
                return 400;
            }

            if (Math.trunc(error.response.data.status / 100) === 5) {
                return 500;
            }
        } finally {
            // dispatch(authActionLoading(false));
        }
    }
}