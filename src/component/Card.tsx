import {
  EnumCardShape,
  EnumCardColor,
  EnumCardNumber,
  EnumCardShading,
} from "../util/cardprop";
import { styled } from "styled-components";
import { Oval, Squiggle, Diamond } from "./Shape";

interface CardProps {
  shape: EnumCardShape;
  color: EnumCardColor;
  number: EnumCardNumber;
  shading: EnumCardShading;
}

const CardContainer = styled.div<{ $selected: boolean }>`
    width: 150px;
    height: 100px;      
    border: 1px solid white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em;
    cursor: pointer;
    ${({ $selected }) => $selected && `
        border: 1px solid red;
    `}
    @media (max-width: 600px) {
        width: 100px;
        height: 60px;
        margin: 0.5em;
    }
`

export default function Card({ shape, color, number, shading, isSelected, onClick }: CardProps & { isSelected: boolean, onClick: () => void }) {
    const numberMap: Record<string, number> = {
        one: 1,
        two: 2,
        three: 3,
    };
    const renderShape = () => {
        switch (shape) {
          case 'oval':
            return <Oval color={color} shading={shading} />;
          case 'squiggle':
            return <Squiggle color={color} shading={shading} />;
          case 'diamond':
            return <Diamond color={color} shading={shading} />;
          default:
            return null;
        }
    };

    return (
        <CardContainer $selected={isSelected} onClick={onClick}>
            {Array.from({ length: numberMap[number] }).map((_, index) => (
                <div key={index} style={{ margin: '0 4px' }}>{renderShape()}</div>
            ))}
        </CardContainer>
    );
}
