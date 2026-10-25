import { messagingApi } from "../api/messaging.api";
import type { IMessagingRepository } from "../repository/messaging.repository";
import type { MessageFilters } from "../types/messaging.types";

class MessagingService implements IMessagingRepository {
  constructor(private readonly repository: IMessagingRepository) {}
  findAll = (filters: MessageFilters, page: number) => this.repository.findAll(filters, page);
}

export const messagingService = new MessagingService(messagingApi);
