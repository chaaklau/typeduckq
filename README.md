# 🦆 TypeDuckQ 打得隙

A single-user typing game built with Phaser 3 framework where Traditional Chinese words fall from the sky like fish into a river, and players help a duck catch them by typing their pronunciations.

## 🎮 Game Features

### **Visual Theme**
- **River Background**: Beautiful flowing river with animated water lines
- **Duck Character**: Friendly animated duck swimming in the center, trying to catch fish
- **Fish Bubbles**: Words appear in floating ball containers like fish bubbles
- **About Button**: Learn more about the game with a dedicated help section

### **Traditional Chinese Words**
- **Traditional Characters**: All characters use Traditional Chinese script
- **Bisyllabic Words**: Includes both single characters and compound words (e.g., 香港, 學校, 餐廳)
- **English Meanings**: Each word shows its English translation
- **Compact Display**: Only Chinese character (large) and English meaning (small) are shown

### **Dynamic Gameplay**
- **Progressive Speed**: Game speed increases every 15 seconds for added challenge
- **Speed Levels**: Visual indicator shows current difficulty level
- **Missed Word Limit**: Game ends after missing 10 words
- **Survival Mode**: After first miss, you have 30 seconds to survive
- **Scoring System**: Higher speed levels give bonus points

### **Customization**
- **Card Appearance**: Adjust size, character color, English text color, and card color
- **Real-time Updates**: Changes apply immediately to all falling words
- **Word Filtering**: 
  - Regex-based filtering for flexible word selection
  - Label-based filtering for categorized practice

### **Enhanced UI**
- **Reduced Popups**: Minimal intrusive notifications
- **Game Over Screen**: Detailed statistics when game ends
- **Visual Effects**: Success animations when words are cleared
- **Time Tracking**: Shows elapsed time and calculates WPM

## 🎯 How to Play

1. **Start**: Click "Start Game" to begin helping the duck catch fish
2. **Type**: Use LSHK pronunciation to catch falling words (e.g., "aap3" for 鴨)
3. **Multi-syllable**: For compound words, include spaces (e.g., "hoeng1 gong2" for 香港)
4. **Survive**: Catch as many words as possible before missing 10 or time runs out
5. **Customize**: Adjust card appearance using the display controls
6. **Filter**: Practice specific word sets using regex or label filters

## 📊 Game Mechanics

- **Starting Speed**: Words fall slowly at first
- **Speed Increase**: Every 15 seconds, falling speed and spawn rate increase
- **Scoring**: 10 points + (5 × speed level) per word
- **Miss Limit**: Game ends after 10 missed words
- **Survival Timer**: 30 seconds to survive after first miss
- **Victory Condition**: Survive as long as possible with high score

## 🎨 Customization Options

### **Card Display Controls**
- **Card Size**: Scale from 50% to 200%
- **Character Color**: Choose color for Chinese characters
- **English Color**: Choose color for English translations  
- **Card Color**: Customize the background bubble color

### **Word Filtering**
- **Regex Filter**: Use patterns like `^動.*` (words starting with 動) or `.*學.*` (words containing 學)
- **Label Filter**: Filter by categories like `animal`, `color`, `number`, `place`, `education`

## 🗂️ File Structure

```
typeduckq/
├── index.html          # Main game interface with river theme
├── js/
│   └── game.js        # Enhanced game logic with speed progression
├── data/
│   └── words.json     # Traditional Chinese word database
└── README.md          # This file
```

## 📚 Word Categories

The game includes 60+ words across categories:
- **Animals**: 鴨 (duck), 狗 (dog), 貓 (cat), 魚 (fish)
- **Colors**: 紅 (red), 藍 (blue), 綠 (green), 黃 (yellow)
- **Numbers**: 一 (one), 二 (two), 三 (three), 十 (ten)
- **Places**: 香港 (Hong Kong), 學校 (school), 醫院 (hospital)
- **People**: 老師 (teacher), 學生 (student), 醫生 (doctor)
- **Nature**: 水 (water), 火 (fire), 山 (mountain), 海 (sea)

## 🚀 Getting Started

1. **Open** `index.html` in a web browser
2. **Optional**: Apply word filters for focused practice
3. **Customize**: Adjust card appearance to your preference
4. **Start Game**: Help the duck catch fish!
5. **Survive**: Try to beat your high score and speed level

## 🛠️ Technical Features

- **Phaser 3 Framework**: Smooth animations and physics
- **Progressive Difficulty**: Dynamic speed and spawn rate adjustments
- **Visual Effects**: Success animations and flowing water background
- **Responsive Design**: Clean sidebar with comprehensive statistics
- **Local Storage Ready**: Easy to extend with save/load functionality

## 🎨 Theme Elements

- **River Environment**: Flowing water with animated lines
- **Duck Character**: Swimming animation with gentle movement
- **Fish Bubbles**: Round containers for words floating down
- **Success Effects**: Visual feedback when catching words
- **About Modal**: Comprehensive game information and instructions

Perfect for practicing Traditional Chinese characters with LSHK romanization in a fun, engaging environment!
