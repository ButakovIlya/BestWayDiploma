import { errorToast, successToast } from "../toasts";

interface Response {
  detail?: string;
  error?: { code: number; message: string };
}

async function request<T extends object | string>(
  url: string,
  config?: RequestInit,
): Promise<T & Response> {
  try {
    return await fetch(url, config)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then((data) => data as T & Response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message as string);
    }
    throw new Error(error as string);
  }
}

export async function requestData<T extends object | string>(
  url: string,
  config?: RequestInit,
): Promise<T> {
  try {
    return await request<T>(url, config).then((data) => {
      if (data.detail || data.error) {
        throw new Error("Попробуйте повторить запрос позже");
      }

      if (config?.next?.tags?.includes("notify")) {
        successToast();
      }

      return data;
    });
  } catch (error) {
    if (error instanceof Error) {
      errorToast(error.message);
    }
    throw new Error(error as string);
  }
}
