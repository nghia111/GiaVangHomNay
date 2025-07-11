import { apiClient } from "../../../services/instance";
import { KimLongPriceRes } from "./types";

export const KimLongService = {
  async getById(id: string): Promise<KimLongPriceRes> {
    const res = await apiClient.get<string>(`https://bg2.kimlongdongthap.vn/_info.aspx?ID=${id}`, {
      responseType: 'text',
    });
    const parser = parseKimLongResponse(res.data);
    console.log("🔍 Raw response:", parser);
    return parser;
  },
};
const parseKimLongResponse = (raw: string): KimLongPriceRes => {
  const lines = raw.split('\n').map(line => line.trim()).filter(line => line !== '');

  return {
    id: Number(lines[0]),
    productName: lines[2],
    productLabel: lines[4],
    productType: lines[6],
    buyPrice: lines[7],
    sellPrice: lines[8],
    buyTrend: lines[9],
    sellTrend: lines[10],
    difference: lines[11],
  };
};
