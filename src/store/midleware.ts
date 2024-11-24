/* eslint-disable @typescript-eslint/no-explicit-any */
// import { i18nTranslator } from "@/services/i18n";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

import { isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      // message.error(i18nTranslator(`${action?.payload?.data?.code}`));
      // toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
    console.log("🚀 ~ api:", api);

    return next(action);
  };
