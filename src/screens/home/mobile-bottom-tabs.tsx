// Update the import paths to the correct locations for HStack and Text
import React from "react";
import { HStack } from "../../components/ui/hstack";
import { Icon } from "../../components/ui/icon";
import { Pressable } from "../../components/ui/pressable";
import { Text } from "../../components/ui/text";
import { VStack } from "../../components/ui/vstack";


const MobileBottomTabs = ({ bottomTabs, activeTab, setActiveTab }: any) => {
  return (
    <>
      <HStack className="justify-between md:hidden  ">
        {bottomTabs.map((tab: any) => {
          return (
            <Pressable
              key={tab.key}
              onPress={() => {
                setActiveTab(tab.key);
              }}
              disabled={tab.disabled}
              //@ts-ignore
              opacity={tab.disabled ? 0.5 : 1}
            >
              <VStack className={`items-center p-2 ${activeTab === tab.key? "bg-slate-200 rounded-lg": ""} `}>
                <Icon
                  as={tab.icon}
                  size='md'
                />
                <Text
                  size="xs"
                  numberOfLines={2}
                >
                  {tab.label}
                </Text>
              </VStack>
            </Pressable>
          );
        })}
      </HStack>
    </>
  );
};

export default MobileBottomTabs;
