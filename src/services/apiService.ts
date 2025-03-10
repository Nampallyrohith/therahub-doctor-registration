const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface ApiResponse<T> {
  data: T;
  error?: string;
  ok: boolean;
}
export const fetchData = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<ApiResponse<T> & { ok: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = method === "DELETE" ? null : await response.json();

  if (data.message) {
    return { data, ok: response.ok || true };
  }

  return { data: null as any, error: data.error, ok: false };
};

// sample code how to use this API in integrating.

// // GET API
//   const { data, error, loading } = useFetchData<User[]>("users");

// // POST API
//   const createUser = async () => {
//     const result = await fetchData<User>("users", "POST", { name: "John Doe" });
//     console.log(result);
//   };

// //   PUT API
//   const updateUser = async () => {
//     const result = await fetchData<User>("users/1", "PUT", { name: "Jane Doe" });
//     console.log(result);
//   };

// //   DELETE API
//   const deleteUser = async () => {
//     const result = await fetchData<null>("users/1", "DELETE");
//     console.log(result);
//   };
