import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Switch, Button } from "react-native";
import { useColorScheme } from "nativewind";
import { Card } from "./Card";
import { useEffect, useState } from "react";
const cards = ["🧑🏻‍🎓", "🛀🏻", "👩🏻‍💼", "🧑🏻‍💻", "👷🏻", "👮🏻‍♂️"];
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, SetMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedCards.length < 2) return;
    if(board[selectedCards[0]] === board[selectedCards[1]]){
      SetMatchedCards([...matchedCards , ...selectedCards])
      setSelectedCards([])
    } else{
      const timeoutId = setTimeout(() => setSelectedCards([]) , 500)
      return () => clearTimeout(timeoutId)
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]), setScore(score + 1);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame = () =>{
    SetMatchedCards([])
    setScore(0)
    setSelectedCards([])
  }
  return (
    <SafeAreaView
      style={{ paddingTop: Platform.OS === "android" ? 30 : 0 }}
      className="flex-1 items-center justify-center bg-white  transition-all duration-1000 dark:bg-black h-full "
    >
      <View className=" flex-col items-center gap-5 w-full mb-5">
        <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />

        <Text className="dark:text-white text-2xl font-bold ">
          {didPlayerWin() ? "Congratulation👏" : "Memory"}
        </Text>
        <Text className="dark:text-white text-2xl font-bold ">
          score : {score}
        </Text>
      </View>
      <View className="flex flex-row flex-wrap justify-center">
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              card={card}
              onPress={() => handleTapCard(index)}
              isTurnedOver={isTurnedOver}
            />
          );
        })}
      </View>
        {didPlayerWin() && <Button onPress={resetGame} title = "reset" /> }
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}
