import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enroll = async (userId: string, courseId: string) => {
  const response = await axios.post(ENROLLMENTS_API, { userId, courseId });
  return response.data;
};

export const unenroll = async (userId: string, courseId: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return response.data;
};

export const findEnrollmentsByUser = async (userId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/user/${userId}`);
  return response.data;
};

export const findEnrollmentsByCourse = async (courseId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/course/${courseId}`);
  return response.data;
};