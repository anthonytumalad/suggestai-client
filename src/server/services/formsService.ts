import api from "../api"
import type { FormListResponse, } from "@/types/types"
import { API_ENDPOINTS } from "../api/endpoints"

export class formsService {
  static async index(page = 1, perPage = 10): Promise<FormListResponse> {
    const { data } = await api.get<FormListResponse>(API_ENDPOINTS.FORMS.INDEX, {
      params: { page, per_page: perPage }
    });
    return data;
  }
}
