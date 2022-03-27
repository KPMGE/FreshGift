export interface GetGiftById {
  execute(giftId?: string): Promise<Gift | null>
}
