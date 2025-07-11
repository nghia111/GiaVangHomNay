import { HStack, VStack } from '@/src/components/ui';
import { useKimLong } from '@/src/hooks/domain/kim-long/use-kim-long';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
} from 'react-native';

const KimLongPriceScreen = () => {
  const { useKimLongPriceMultiQuery } = useKimLong();
  const { data, isLoading, isError, refetch } = useKimLongPriceMultiQuery(['1', '2', '8', '3', '4', '5']);
const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
        refetch(); // call API mỗi 5 giây
        setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval); // Clear khi unmount
  }, [refetch]);


  if (isLoading) return <ActivityIndicator size="large" />;
  if (isError) return <Text className="text-red-500 text-lg p-4">Có lỗi khi tải dữ liệu</Text>;

  return (
    <View className="flex-1 bg-white">
      {/* Header cố định */}
      <View className="p-4 border-b border-gray-300 items-center bg-white z-10">
        <VStack>
            <Text className="text-2xl font-bold text-yellow-600">💰 Giá vàng Kim Long</Text>
            <Text>Cập nhật lúc: {currentTime.toLocaleString()} </Text>
        </VStack>
      </View>

      {/* Nội dung có thể scroll */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {data?.map((item, index) => (
          <View
            key={index}
            className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <Text className="text-xl font-bold mb-2">{item.productName}</Text>

            <HStack className="justify-between mb-2">
              <HStack className="space-x-1">
                <Text className="font-bold text-lg text-gray-800">Nhãn: </Text>
                <Text className="text-lg text-gray-800">{item.productLabel}</Text>
              </HStack>
              <HStack className="space-x-1">
                <Text className="font-bold text-lg text-gray-800">Loại: </Text>
                <Text className="text-lg text-gray-800">{item.productType}</Text>
              </HStack>
            </HStack>

            <HStack className="space-x-1 mb-2">
              <Text className="font-bold text-lg text-gray-800">Giá mua: </Text>
              <Text className="text-lg text-gray-800">{item.buyPrice} ₫</Text>
            </HStack>

            <HStack className="space-x-1">
              <Text className="font-bold text-lg text-gray-800">Giá bán: </Text>
              <Text className="text-lg text-gray-800">{item.sellPrice} ₫</Text>
            </HStack>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default KimLongPriceScreen;
