import { useSelector } from "react-redux";

// Hook to check if current user has faculty role
export const useIsFaculty = () => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return currentUser?.role === "FACULTY";
};

// Hook to check if current user has student role
export const useIsStudent = () => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return currentUser?.role === "STUDENT";
};

// Hook to check if current user has TA role
export const useIsTA = () => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return currentUser?.role === "TA";
};

// Hook to get current user's role
export const useUserRole = () => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return currentUser?.role;
};