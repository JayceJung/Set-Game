import styled from "styled-components";
import { EnumCardShape, EnumCardColor, EnumCardNumber, EnumCardShading } from "../util/cardprop";
import Card from "./Card";
import { useCallback, useState, useEffect } from "react";

interface CardProps {
    shape: EnumCardShape;
    color: EnumCardColor;
    number: EnumCardNumber;
    shading: EnumCardShading;
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 1em;
    padding: 1em;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em;
    gap: 1em;giv
`;

const ResetButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const StartButton = styled.button`
    margin-top: 20px;
`;

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export default function CardBoard() {
    
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [displayedCards, setDisplayedCards] = useState<number[]>(Array.from({ length: 12 }, (_, i) => i));
    const [cardList, setCardList] = useState<Record<number, CardProps>>({});
    const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes in seconds
    const [score, setScore] = useState<number>(0);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start');
    const [allScores, setAllScores] = useState<number[]>([]);
    
    useEffect(() => {
        const storedScores = JSON.parse(localStorage.getItem('scores') || '[]');
        setAllScores(storedScores);
    }, []);

    const shuffleObject = (obj: Record<number, CardProps>) => {
        const entries = Object.entries(obj);
        for (let i = entries.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [entries[i], entries[j]] = [entries[j], entries[i]];
        }
        const shuffledObj: Record<number, CardProps> = {};
        entries.forEach(([, value], index) => {
            shuffledObj[index] = value; // Reassign new keys
        });
        return shuffledObj;
    }

    const generateCardList = () => {
        const shapes = Object.values(EnumCardShape);
        const colors = Object.values(EnumCardColor);
        const numbers = Object.values(EnumCardNumber);
        const shadings = Object.values(EnumCardShading);

        const cardList: Record<number, CardProps> = {};
        let id = 0;

        shapes.forEach(shape => {
            colors.forEach(color => {
                numbers.forEach(number => {
                    shadings.forEach(shading => {
                        cardList[id] = { shape, color, number, shading };
                        id++;
                    });
                });
            });
        });
        return shuffleObject(cardList);
    }

    const handleCardClick = useCallback((index: number) => {
        setSelectedCards(prevSelected => {
            if (prevSelected.includes(index)) {
                return prevSelected.filter(id => id !== index);
            }
            if (prevSelected.length < 3) {
                return [...prevSelected, index];
            }
            return prevSelected;
        });
    }, []);

    const checkSet = () => {
        if (selectedCards.length === 3) {
            const cards = selectedCards.map(index => cardList[index]);
            if (isSet(cards)) {
                console.log("Valid set!");
                setScore(prevScore => prevScore + 1);
                replaceSet();
            } else {
                console.log("Not a set.");
            }
        }
    }

    const checkNoSet = () => {
        const cards = displayedCards.map(index => cardList[index]);
        if (!checkForAnySet(cards)) {
            console.log("Correct, no set!");
            setScore(prevScore => prevScore + 5);
        } else {
            console.log("Incorrect, there is a set.");
            setScore(prevScore => prevScore - 2);
        }
    }

    const replaceSet = () => {
        setDisplayedCards(prevDisplayed => {
            const nextCards = prevDisplayed.slice();
            const maxIndex = Math.max(...nextCards);

            selectedCards.forEach((selectedIndex, i) => {
                const nextIndex = maxIndex + 1 + i;
                if (nextIndex < Object.keys(cardList).length) {
                    nextCards[nextCards.indexOf(selectedIndex)] = nextIndex;
                }
            });

            return nextCards;
        });
        setSelectedCards([]);
    }

    const isSet = (cards: CardProps[]) => {
        const checkProperty = (property: keyof CardProps) => {
            const values = cards.map(card => card[property]);
            const uniqueValues = new Set(values);
            return uniqueValues.size === 1 || uniqueValues.size === 3;
        };
    
        return (
            checkProperty('shape') &&
            checkProperty('color') &&
            checkProperty('number') &&
            checkProperty('shading')
        );
    }

    const checkForAnySet = (cardList: CardProps[]) => {
        for (let i = 0; i < cardList.length - 2; i++) {
            for (let j = i + 1; j < cardList.length - 1; j++) {
                for (let k = j + 1; k < cardList.length; k++) {
                    if (isSet([cardList[i], cardList[j], cardList[k]])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    const resetGame = () => {
        setCardList(generateCardList());
        setDisplayedCards(Array.from({ length: 12 }, (_, i) => i));
        setSelectedCards([]);
        setTimeLeft(120);
        setScore(0);
        setGameState('playing');
    }

    const endGame = useCallback(() => {
        setGameState('gameOver');
        const updatedScores = [...allScores, score];
        setAllScores(updatedScores);
        localStorage.setItem('scores', JSON.stringify(updatedScores));
    }, [allScores, score]);


    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (gameState === 'playing' && timeLeft === 0) {
            endGame();
        }
    }, [timeLeft, gameState, endGame]);

    if (gameState === 'start') {
        return (
            <GameContainer>
                <h1>Welcome to the Set Game!</h1>
                <p>You have 2 minutes to find as many sets as you can.</p>
                <StartButton onClick={resetGame}>Start Game</StartButton>
            </GameContainer>
        );
    }

    if (gameState === 'gameOver') {
        return (
            <GameContainer>
                <h1>Game Over!</h1>
                <p>Your Score: {score}</p>
                <h2>All Scores:</h2>
                <ul>
                    {allScores.map((s, index) => (
                        <li key={index}>{s}</li>
                    ))}
                </ul>
                <StartButton onClick={() => setGameState('start')}>Back to Start</StartButton>
            </GameContainer>
        );
    }

    return (
        <>
            <ResetButton onClick={resetGame}>Reset Game</ResetButton>
            <div>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
            <div>Score: {score}</div>
            <GridContainer>
                {displayedCards.map((index) => {
                    const card = cardList[index];
                    return (
                        <Card
                            key={index}
                            isSelected={selectedCards.includes(index)}
                            onClick={() => handleCardClick(index)}
                            {...card}
                        />
                    );
                })}
            </GridContainer>
            <ButtonContainer>
                <button onClick={checkSet}>Set!</button>
                <button onClick={checkNoSet}>No Set!</button>
            </ButtonContainer>
        </>
    );
}
