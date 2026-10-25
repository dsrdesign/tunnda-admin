import { apiClient } from "@/lib/api-client";
import { PAGE_SIZE, type Page } from "@/lib/page";
import type { IMessagingRepository } from "../repository/messaging.repository";
import type { MessageFilters, MessageRow } from "../types/messaging.types";

class MessagingApi implements IMessagingRepository {
  async findAll(filters: MessageFilters, page: number): Promise<Page<MessageRow>> {
    const { data } = await apiClient.get<Page<MessageRow>>("/messages", {
      params: { page, pageSize: PAGE_SIZE, ...filters },
    });
    return data;
  }
}

export const messagingApi = new MessagingApi();
