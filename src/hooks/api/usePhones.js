import { useEffect, useState } from "react";
import http from "../../utils/http";

export const useGetPhones = () => {
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    getPhones();
  }, []);

  const getPhones = async () => {
    try {
      setLoadingTable(true);
      const response = await http.get(`phone/getPhones`);
      if (response.data.ok) {
        setPhones(response.data.phones);
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingTable(false);
    }
  };

  const createPhone = async (body) => {
    try {
      setLoadingModal(true);
      const response = await http.post("phone/createPhone", {
        ...body,
      });
      if (response.data.ok) {
        setPhones((prevPhones) => [...prevPhones, response.data.phone]);
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingModal(false);
    }
  };

  const updatePhone = async (id, body) => {
    try {
      setLoadingModal(true);
      const response = await http.put(`phone/updatePhone/${id}`, { ...body });
      if (response.data.ok) {
        setPhones((prevPhones) =>
          prevPhones.map((phone) =>
            phone._id === id ? { ...phone, ...response.data.phone } : phone
          )
        );
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingModal(false);
    }
  };

  const deletePhone = async (id) => {
    try {
      setLoadingModal(true);
      const response = await http.delete(`phone/deletePhone/${id}`);
      if (response.data.ok) {
        setPhones((prevPhones) =>
          prevPhones.filter((phone) => phone._id !== id)
        );
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingModal(false);
    }
  };

  return {
    loadingTable,
    phones,
    createPhone,
    updatePhone,
    loadingModal,
    deletePhone,
  };
};

// export const useCreateQuestion = (body: IQuestion): UseQuestionType => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const load = async (): Promise<{
//     response: IResponse | null;
//     error: IError | null;
//   }> => {
//     try {
//       setLoading(true);
//       const response = await http.post("question/createQuestion", { ...body });
//       return { response, error: null };
//     } catch (error: any) {
//       return {
//         response: null,
//         error: {
//           response: error.response.data,
//           message:
//             error.response?.data.message || "An unexpected error occurred",
//         },
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return [loading, load];
// };

// export const useGetTaskByIdAndHistory = (id: string) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [taskData, setTaskData] = useState<ITask>({
//     title: "",
//     description: "",
//     time: "00:00",
//     level: 1,
//     questions: [],
//     ramdonQuestions: false,
//   });
//   const [history, setHistory] = useState<IUserResponse[]>([]);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         const response = await http.get(`task/getTaskByIdAndHistory/${id}`);
//         if (response.data.ok) {
//           setTaskData({ ...taskData, ...response.data.task });
//           setHistory(response.data.history);
//         }
//       } catch (error: any) {
//         console.error(
//           error.response?.data.message || "An unexpected error occurred"
//         );
//         router.push("/dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   return { loading, taskData, setTaskData, history };
// };

// export const useGetHistoryByUser = (id: string) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [history, setHistory] = useState<IUserResponse[]>([]);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         const response = await http.get(
//           `userResponse/getUserResponseByUser/${id}`
//         );
//         if (response.data.ok) {
//           setHistory(response.data.history);
//         }
//       } catch (error: any) {
//         console.error(
//           error.response?.data.message || "An unexpected error occurred"
//         );
//         // router.push("/dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   return { loading, history };
// };

// export const useGetUserResponseByUserAndTask = (id: string) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [history, setHistory] = useState<IUserResponse[]>([]);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         const response = await http.get(
//           `userResponse/getUserResponseByUserAndTask/${id}`
//         );
//         if (response.data.ok) {
//           setHistory(response.data.history);
//         }
//       } catch (error: any) {
//         console.error(
//           error.response?.data.message || "An unexpected error occurred"
//         );
//         router.push("/dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   return { loading, history };
// };

// export const getUserResponseById = (id: string) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [history, setHistory] = useState<IUserResponse | null>(null);
//   const [taskData, setTaskData] = useState<ITask | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         const response = await http.get(
//           `userResponse/getUserResponseById/${id}`
//         );
//         if (response.data.ok) {
//           setHistory(response.data.history);
//           setTaskData(response.data.history.task);
//         }
//       } catch (error: any) {
//         console.error(
//           error.response?.data.message || "An unexpected error occurred"
//         );
//         router.push("/dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   return { loading, history, taskData };
// };

// export const getTaskByIdToStart = (id: string, index: number) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [questionData, setQuestionData] = useState<IQuestion | null>(null);
//   const [questionAmount, setQuestionAmount] = useState<number>(0);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         const response = await http.get(
//           `task/getTaskByIdToStart/${id}/${index}`
//         );
//         if (response.data.ok) {
//           setQuestionData(response.data.question);
//           setQuestionAmount(response.data.totalQuestions);
//         }
//       } catch (error: any) {
//         console.error(
//           error.response?.data.message || "An unexpected error occurred"
//         );
//         router.back();
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   return { loading, questionData, questionAmount };
// };

// export const getUserResponseByIdAndQuestion = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [savedQuestionData, setSavedQuestionData] =
//     useState<ISubmittedAnswers | null>(null);

//   const load = async (id: string, question: string) => {
//     try {
//       setLoading(true);
//       const response = await http.get(
//         `userResponse/getUserResponseByIdAndQuestion/${id}/${question}`
//       );
//       if (response.data.ok) {
//         setSavedQuestionData(response.data.questionResponse);
//       }
//     } catch (error: any) {
//       console.error(
//         error.response?.data.message || "An unexpected error occurred"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, savedQuestionData, load };
// };
