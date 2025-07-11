import {
  SlidersHorizontal
} from "lucide-react-native";
import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { Box, Text } from "../../components/ui";
import KimLongPriceScreen from "../kim-long/kim-long-price-screen";
import MobileBottomTabs from "./mobile-bottom-tabs";

const bottomTabs = [
  {
    key: 'kimlong',
    icon: SlidersHorizontal,
    label: 'Giá vàng Kim Long',
    screen: <KimLongPriceScreen/>,
  },
  // {
  //   key: 'khac',
  //   icon: SlidersHorizontal,
  //   label: 'Giá vàng khác',
  //   screen: <Text>Giá vàng khác</Text>,
  // }
];

const BottomTab = () => {
  const [activeTab, setActiveTab] = React.useState('kimlong');
  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
  }, []);
  const currentTab = bottomTabs.find(tab => tab.key === activeTab);
  return (
    <Box className="flex-1">
      <StatusBar />
      <Box className="flex-1">
        {currentTab?.screen ?? <Text>Không tìm thấy tab</Text>}
      </Box>
      <Box className="p-4 items-center w-full flex md:hidden border-t border-outline-50">
        <MobileBottomTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bottomTabs={bottomTabs}
        />
      </Box>
    </Box>  );
};
export default BottomTab;