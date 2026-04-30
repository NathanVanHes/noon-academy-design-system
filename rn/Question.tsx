/**
 * Question — the complete question component.
 * Renders question content (text, image, or both) then the answer type.
 *
 * <Question text="What is velocity?" type="match" matchProps={{...}} />
 * <Question text="Label the diagram" image={img} type="hotspot" hotspotProps={{...}} />
 * <Question image={img} type="choice" choiceProps={{...}} />
 */
import React from 'react';
import { View, Text, Image, type ImageSourcePropType } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';
import { QuizOption } from './QuizOption';
import { MatchQuestion } from './MatchQuestion';
import { CategorizeQuestion } from './CategorizeQuestion';
import { OrderQuestion } from './OrderQuestion';
import { FillBlanksQuestion } from './FillBlanksQuestion';
import { HotspotQuestion } from './HotspotQuestion';
import type { DragItemData } from './DragItem';

// Answer type props — each omits `question` since Question handles that
interface ChoiceOption {
  label: string;
  text?: string;
  image?: ImageSourcePropType;
}

interface ChoiceProps {
  options: ChoiceOption[];
  selected?: number;
  correctIndex?: number;
  submitted?: boolean;
  onSelect?: (index: number) => void;
}

interface MatchProps {
  items: DragItemData[];
  targets: { id: string; label: string }[];
  correctMapping: Record<string, string>;
}

interface CategorizeProps {
  items: DragItemData[];
  categories: { id: string; label: string }[];
  correctMapping: Record<string, string>;
}

interface OrderProps {
  items: DragItemData[];
  correctOrder: string[];
}

interface FillBlanksProps {
  sentence: string;
  items: DragItemData[];
  correctMapping: Record<string, string>;
}

interface HotspotProps {
  image: ImageSourcePropType;
  imageAspectRatio?: number;
  zones: { id: string; label?: string; x: number; y: number; width: number; height: number }[];
  items: DragItemData[];
  correctMapping: Record<string, string>;
}

type QuestionType = 'choice' | 'match' | 'categorize' | 'order' | 'fillblanks' | 'hotspot';

interface QuestionProps {
  text?: string;
  image?: ImageSourcePropType;
  imageAspectRatio?: number;
  instruction?: string;
  optionsPosition?: 'top' | 'bottom';
  showButtons?: boolean;
  onAnswer?: (placements: Record<string, string>) => void;
  onReady?: (controls: { submit: () => void; reset: () => void; allPlaced: boolean; submitted: boolean }) => void;
  type: QuestionType;
  choiceProps?: ChoiceProps;
  matchProps?: MatchProps;
  categorizeProps?: CategorizeProps;
  orderProps?: OrderProps;
  fillBlanksProps?: FillBlanksProps;
  hotspotProps?: HotspotProps;
}

const TYPE_INSTRUCTIONS: Record<QuestionType, string> = {
  choice: 'Select the correct answer',
  match: 'Drag each item to its match',
  categorize: 'Drag each item into the correct category',
  order: 'Drag items into the correct order',
  fillblanks: 'Drag words into the blanks',
  hotspot: 'Drag items to the correct regions',
};

function ChoiceAnswer({ options, selected, correctIndex, submitted, onSelect }: ChoiceProps) {
  return (
    <View style={{ gap: sp[2] }}>
      {options.map((opt, i) => {
        let state: 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled' = 'default';
        if (submitted && correctIndex !== undefined) {
          if (i === correctIndex) state = 'correct';
          else if (i === selected) state = 'incorrect';
          else state = 'disabled';
        } else if (i === selected) {
          state = 'selected';
        }
        return (
          <QuizOption
            key={i}
            label={opt.label}
            text={opt.text}
            image={opt.image}
            state={state}
            onPress={() => onSelect?.(i)}
          />
        );
      })}
    </View>
  );
}

export function Question({ text, image, imageAspectRatio = 16 / 9, instruction, optionsPosition, showButtons, onAnswer, onReady, type, choiceProps, matchProps, categorizeProps, orderProps, fillBlanksProps, hotspotProps }: QuestionProps) {
  const { theme } = useTheme();
  const inst = instruction || TYPE_INSTRUCTIONS[type];

  return (
    <View style={{ gap: sp[4] }}>
      {/* Question content */}
      {(text || image) && (
        <View style={{ gap: sp[3] }}>
          {image && (
            <Image
              source={image}
              style={{ width: '100%', aspectRatio: imageAspectRatio, borderRadius: r[2], backgroundColor: theme.hoverOverlay }}
              resizeMode="cover"
            />
          )}
          {text && (
            <Text style={{ fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg }}>{text}</Text>
          )}
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>{inst}</Text>
        </View>
      )}

      {/* Answer type */}
      {type === 'choice' && choiceProps && (
        <ChoiceAnswer {...choiceProps} />
      )}
      {type === 'match' && matchProps && (
        <MatchQuestion optionsPosition={optionsPosition} showButtons={showButtons} onAnswer={onAnswer} onReady={onReady} {...matchProps} />
      )}
      {type === 'categorize' && categorizeProps && (
        <CategorizeQuestion optionsPosition={optionsPosition} showButtons={showButtons} onAnswer={onAnswer} onReady={onReady} {...categorizeProps} />
      )}
      {type === 'order' && orderProps && (
        <OrderQuestion optionsPosition={optionsPosition} showButtons={showButtons} onAnswer={onAnswer} onReady={onReady} {...orderProps} />
      )}
      {type === 'fillblanks' && fillBlanksProps && (
        <FillBlanksQuestion optionsPosition={optionsPosition} showButtons={showButtons} onAnswer={onAnswer} onReady={onReady} {...fillBlanksProps} />
      )}
      {type === 'hotspot' && hotspotProps && (
        <HotspotQuestion optionsPosition={optionsPosition} showButtons={showButtons} onAnswer={onAnswer} onReady={onReady} {...hotspotProps} />
      )}
    </View>
  );
}
