import type { Page } from "@/lib/page";
import type { MessageFilters, MessageRow } from "../types/messaging.types";

export interface IMessagingRepository {
  findAll(filters: MessageFilters, page: number): Promise<Page<MessageRow>>;
}
