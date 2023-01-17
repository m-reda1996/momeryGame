import React from "react";
import { useColorScheme } from "nativewind";
import { Pressable, Text, StyleSheet } from "react-native";

export function Card({ onPress, isTurnedOver, card }) {
  return (
    <Pressable
    onPress={onPress}
    disabled={isTurnedOver}
      className={
        isTurnedOver
          ? " w-[70px] h-[70px] justify-center rounded-xl  m-1 bg-slate-500 border-[3px] border-slate-300"
          : " w-[70px] h-[70px] justify-center rounded-xl  m-1 bg-slate-500 border-[3px] border-slate-300"
      }
    >
      {isTurnedOver ? (
        <Text className="text-[45px]  text-center">{card} </Text>
      ) : (
        <Text className="text-[30px] text-center">?</Text>
      )}
    </Pressable>
  );
}
