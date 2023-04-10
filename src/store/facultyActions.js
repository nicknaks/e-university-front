import axios from "axios";
import {localUrl} from "./store";
import {facultyActionFaculties} from "./facultyReducer";

export const facultiesList = () => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchFaculties",
                    "query": `query fetchFaculties{ faculties { id name number departments{ id name number }}}`,
                }
            });

            dispatch(facultyActionFaculties(res.data.data.faculties))
            return true
        } catch (error) {
            console.log(error)
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