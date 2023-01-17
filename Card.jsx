import React from "react";
import { useColorScheme } from "nativewind";
import { Pressable, Text, StyleSheet } from "react-native";

export function Card({ onPress, isTurnedOver, card }) {
  return (
    <Pressable
    onPress={onPress}
      className={
        isTurnedOver
          ? " w-[100px] h-[100px] justify-center rounded-xl  m-3 bg-slate-500 border-[7px] border-slate-300"
          : " w-[100px] h-[100px] justify-center rounded-xl  m-3 bg-slate-500 border-[7px] border-slate-300"
      }
    >
      {isTurnedOver ? (
        <Text className="text-[42px]  text-center">{card} </Text>
      ) : (
        <Text className="text-[42px] text-center">?</Text>
      )}
    </Pressable>
  );
}
