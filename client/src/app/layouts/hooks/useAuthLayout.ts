import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { selectMe } from "@/entities/me";
import { useAppSelector } from "@/shared/store";

export const useAuthLayout = () => {
  const { data } = useAppSelector(selectMe);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!Object.keys(data).length) return navigate('/');
  }, [data, navigate])
};
