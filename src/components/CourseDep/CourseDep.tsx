import React, {FC} from 'react';
import './CourseDep.css'
import {Link} from "react-router-dom";

interface CourseDepProps {
    numberCourse: string,
    href: string,
}

const CourseDep: FC<CourseDepProps> = ({numberCourse, href}) => {
    return (
        <div className='number-course-cont'>
            <Link to={`/schedule/${href}`} className='number-course-text'>{numberCourse}</Link>
        </div>
    );
};

export default CourseDep;